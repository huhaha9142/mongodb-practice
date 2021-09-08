//  exports 객체: 모듈을 내보내는 전역 객체
exports.add = (num1, num2) => {
    return num1 + num2;
}   //  add라는 이름으로 객체를 내보냄
exports.square = (length) => {
    return length ** 2;
}   //  square라는 이름으로 객체를 내보냄