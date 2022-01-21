module.exports = {
    formatCurrency: (dateString) => {
        let retVal = '';

        return retVal
    },
    Log: (msg, obj) => {
        const time = new Date();
        const timeStamp = `[${time.getFullYear()}/${time.getMonth()}/${time.getDate} | ${time.toTimeString()} (${time.getMilliseconds}ms)] > `;
        console.log(timestamp + msg);
        if (obj) {
            console.log('', obj);
        }
    },
    format_time: (date) => {
        return date.toLocaleTimeString();
    },
    format_date: (date) => {
        const rawDate = new Date(date);
        return `${rawDate.getMonth() + 1}/${rawDate.getDate()}/${rawDate.getFullYear()}`;
    },
};