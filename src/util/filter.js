export const data = {};

//补贴状态
data.visitStatus = [
    {label:'待审核',code:'0'},
    {label:'待进入',code:'1'},
    {label:'已失效',code:'2'},
    {label:'已进入',code:'3'},
    {label:'已离开',code:'4'},
    {label:'驳回',code:'5'}
];
data.equipmentStatus = [
    {label:'正常',code:'0'},
    {label:'告警',code:'1'},
    {label:'预警',code:'2'},
    {label:'离线',code:'3'},
]

export function getEquipmentStatus(val) {
    for (let i = 0; i < data.equipmentStatus.length; i++) {
        if (val === data.equipmentStatus[i].code) {
            return data.equipmentStatus[i].label;
        }
    }
}


export function getVisitStatus(val) {
    for (let i = 0; i < data.visitStatus.length; i++) {
        if (val === data.visitStatus[i].code) {
            return data.visitStatus[i].label;
        }
    }
}

export function getTime(date,format) {
    if (!date) return;
    if (!format) format = "yyyy-MM-dd HH:mm:ss";
    switch (typeof date) {
        case "string":
            date = new Date(date);
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return;
    var dict = {
        "yyyy" : date.getFullYear(),
        "M" : date.getMonth() + 1,
        "d" : date.getDate(),
        "H" : date.getHours(),
        "m" : date.getMinutes(),
        "s" : date.getSeconds(),
        "MM" : ("" + (date.getMonth() + 101)).substr(1),
        "dd" : ("" + (date.getDate() + 100)).substr(1),
        "HH" : ("" + (date.getHours() + 100)).substr(1),
        "mm" : ("" + (date.getMinutes() + 100)).substr(1),
        "ss" : ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]];
    });
}

