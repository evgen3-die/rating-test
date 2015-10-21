Template.websitePageTableItem.helpers({
    date: function() {
        var date = this.date;

        return moment(date).format("DD.MM.YYYY");
    }
});