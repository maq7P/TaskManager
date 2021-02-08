const zone = 3
const dateUtil = {
    addToDate: (date, hours = zone, day=0, month=0, year=0) => {
        function intF1(e) {
            return e.getFullYear()
                + "-" + ('0' + (e.getMonth() + 1)).slice(-2)
                + "-" + ('0' + e.getDate()).slice(-2)
                + "-" + ('0' + e.getHours()).slice(-2);
        }
        const D = new Date(date)
        D.setFullYear(
            D.getFullYear() + parseFloat(year),
            D.getMonth() + parseFloat(month),
            D.getDate() + parseFloat(day),
        );

        return intF1(D)
    },
    today: function (){
        function inner() {
            return this.addToDate(new Date().toJSON()).slice(0,10).replace(/-/g,'-')
        }
        return inner.call(dateUtil)
    },
    dayOfWeek: (date) => {
        date = date || new Date();
        const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        const day = date.getDay();

        return days[day];
    }
}
module.exports = dateUtil