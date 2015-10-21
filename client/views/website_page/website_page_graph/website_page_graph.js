var chartJs = function (canvas, chartX, dataVisitiors, dataViews) {
    Chart.defaults.global.responsive = true;
    var data = {
            labels: [],
            datasets: [
                {
                    label: "Посетители",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: []
                },
                {
                    label: "Просмотры",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: []
                }
            ]
        };

    data.labels = chartX;
    data.datasets[0].data = dataVisitiors;
    data.datasets[1].data = dataViews;

    var chart = new Chart(canvas).Line(data, {
        bezierCurve : false
    });
};

var c3Js = function (thisTemplate, chartX, dataVisitiors, dataViews) {
    var chartX = ['Дата'].concat(chartX),
        dataVisitiors = ['Посетители'].concat(dataVisitiors),
        dataViews = ['Просмотры'].concat(dataViews);

    Session.set('x', chartX);
    Session.set('data1', dataVisitiors);
    Session.set('data2', dataViews);
    var chart = c3.generate({
        bindto: thisTemplate.find('.chart'),
        data: {
            xs: {
                'Посетители': 'Дата',
                'Просмотры': 'Дата'
            },
            columns: [['x'],['data1'],['data2']]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d.%m.%Y'
                }
            }
        }
    });

    thisTemplate.autorun(function (tracker) {
        chart.load({columns: [
            Session.get('x'),
            Session.get('data1'),
            Session.get('data2'),
            []
        ]});
    });
};

Template.websitePageGraph.onRendered(function () {
    var canvas = $(this.find('#chart')).get(0).getContext("2d"),
        websiteData = Template.currentData().data;

    var chartX = [],
        chartXc3 = [],
        dataVisitiors = [],
        dataViews = [];

    for (var i = websiteData.length - 1; i >= 0; i--) {
        chartX.push(moment(websiteData[i].date).format("DD.MM.YYYY"));
        chartXc3.push(websiteData[i].date);
        dataVisitiors.push(websiteData[i].visitors);
        dataViews.push(websiteData[i].views);
    }

    chartJs(canvas, chartX, dataVisitiors, dataViews);

    c3Js(this, chartXc3, dataVisitiors, dataViews);



});