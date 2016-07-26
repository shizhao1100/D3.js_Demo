var k = function (type) {
    if(type==1)
    {
        console.log("111");
    }
    else{
        console.log("222");
    }
}
var f = function () {
    return 1;
}
var UnKnowFun = (function () {
        return function (f) {
            return k(f);
        };
    })();