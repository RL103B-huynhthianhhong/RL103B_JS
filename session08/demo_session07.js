let chargingQueue = ['30A-111', '29B-222', '51C-333'];
console.log("Hàng đợi ban đầu:", chargingQueue);
chargingQueue.push('43D-444');
console.log("Sau khi thêm xe mới:", chargingQueue);
console.log("Xe 43D-444 có trong hàng đợi không:", chargingQueue.includes('43D-444'));
console.log("Vị trí xe 43D-444:", chargingQueue.indexOf('43D-444'));
chargingQueue.splice(1, 0, '14A-999');
console.log("Sau khi chèn xe ưu tiên:", chargingQueue);

let chargingCar = chargingQueue.shift();
console.log("Xe vào cổng sạc:", chargingCar);
console.log("Hàng đợi sau khi xe vào sạc:", chargingQueue);

let electricityUsed = [30, 45, 25];
let price = 4500;
let totalKWh = 0;

for (let i = 0; i < electricityUsed.length; i++) {
    totalKWh = totalKWh + electricityUsed[i];
}

let totalMoney = totalKWh * price;

console.log("----- BÁO CÁO -----");
console.log("Tổng điện năng:", totalKWh, "kWh");
console.log("Đơn giá:", price, "VNĐ/kWh");
console.log("Tổng doanh thu:", totalMoney, "VNĐ");