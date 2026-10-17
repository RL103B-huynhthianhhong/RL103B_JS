
let passengers = [];

const seats = ["12A", "12B", "12C", "14A", "14B", "14C"];

function validateId(idNumber) {
    const cccd = /^[0-9]{12}$/;
    const passport = /^[A-Za-z][0-9]{7,8}$/;

    return cccd.test(idNumber) || passport.test(idNumber);
}

function findPassenger(pnrCode) {
    return passengers.find(passenger => passenger.pnrCode === pnrCode);
}

function findSeat(flightNumber) {
    const usedSeats = passengers
        .filter(passenger => passenger.flightNumber === flightNumber)
        .map(passenger => passenger.seatNumber);

    return seats.find(seat => !usedSeats.includes(seat));
}

function addPassenger() {
    let pnrCode = prompt("Nhập mã PNR:");

    if (!pnrCode || !pnrCode.trim()) {
        console.log("Lỗi: Mã PNR không được để trống!");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    if (findPassenger(pnrCode)) {
        console.log("Lỗi: Mã PNR đã tồn tại!");
        return;
    }

    let passengerName = prompt("Nhập họ tên hành khách:");

    if (!passengerName || !passengerName.trim()) {
        console.log("Lỗi: Họ tên không được để trống!");
        return;
    }

    let idNumber = prompt("Nhập CCCD hoặc hộ chiếu:");

    if (!idNumber || !validateId(idNumber.trim())) {
        console.log("Lỗi: CCCD hoặc hộ chiếu không hợp lệ!");
        return;
    }

    idNumber = idNumber.trim().toUpperCase();

    if (passengers.some(passenger => passenger.idNumber === idNumber)) {
        console.log("Lỗi: Giấy tờ tùy thân đã được sử dụng!");
        return;
    }

    let flightNumber = prompt("Nhập số hiệu chuyến bay:");

    if (!flightNumber || !flightNumber.trim()) {
        console.log("Lỗi: Số hiệu chuyến bay không được để trống!");
        return;
    }

    flightNumber = flightNumber.trim().toUpperCase();

    const passenger = {
        pnrCode: pnrCode,
        passengerName: passengerName.trim(),
        idNumber: idNumber,
        flightNumber: flightNumber,
        seatNumber: "",
        isCheckedIn: false
    };

    passengers.push(passenger);

    console.log("Đã thêm hồ sơ hành khách thành công!");
    console.log(passenger);
}

function checkInPassenger() {
    let pnrCode = prompt("Nhập mã PNR cần check-in:");

    if (!pnrCode || !pnrCode.trim()) {
        console.log("Lỗi: Mã PNR không được để trống!");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    const passenger = findPassenger(pnrCode);

    if (!passenger) {
        console.log("Lỗi: Không tìm thấy hành khách!");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hành khách đã check-in!");
        return;
    }

    const idNumber = prompt("Nhập lại CCCD hoặc hộ chiếu để xác thực:");

    if (!idNumber || idNumber.trim().toUpperCase() !== passenger.idNumber) {
        console.log("Lỗi: Giấy tờ tùy thân không khớp!");
        return;
    }

    if (!validateId(idNumber.trim())) {
        console.log("Lỗi: Giấy tờ tùy thân không hợp lệ!");
        return;
    }

    const seatNumber = findSeat(passenger.flightNumber);

    if (!seatNumber) {
        console.log("Lỗi: Chuyến bay đã hết ghế!");
        return;
    }

    passenger.seatNumber = seatNumber;
    passenger.isCheckedIn = true;

    console.log("Check-in thành công!");
    console.log("Hành khách:", passenger.passengerName);
    console.log("Chuyến bay:", passenger.flightNumber);
    console.log("Số ghế:", passenger.seatNumber);
}

function printBoardingPass() {
    let pnrCode = prompt("Nhập mã PNR để in thẻ lên máy bay:");

    if (!pnrCode || !pnrCode.trim()) {
        console.log("Lỗi: Mã PNR không được để trống!");
        return;
    }

    pnrCode = pnrCode.trim().toUpperCase();

    const passenger = findPassenger(pnrCode);

    if (!passenger) {
        console.log("Lỗi: Không tìm thấy hành khách!");
        return;
    }

    if (!passenger.isCheckedIn) {
        console.log("Lỗi: Hành khách chưa check-in!");
        return;
    }

    console.log("========================================");
    console.log("             BOARDING PASS              ");
    console.log("========================================");
    console.log("PASSENGER : " + passenger.passengerName);
    console.log("PNR CODE  : " + passenger.pnrCode);
    console.log("ID NUMBER : " + passenger.idNumber);
    console.log("FLIGHT    : " + passenger.flightNumber);
    console.log("SEAT      : " + passenger.seatNumber);
    console.log("STATUS    : CHECKED IN");
    console.log("----------------------------------------");
    console.log("|| ||| | || |||| | ||| || |||| | ||| ||");
    console.log("       SIMULATED BARCODE");
    console.log("========================================");
}

function listPassengers() {
    if (passengers.length === 0) {
        console.log("Chưa có hồ sơ hành khách!");
        return;
    }

    console.log("DANH SÁCH HÀNH KHÁCH");

    passengers.forEach((passenger, index) => {
        console.log("------------------------------");
        console.log("STT:", index + 1);
        console.log("PNR:", passenger.pnrCode);
        console.log("Họ tên:", passenger.passengerName);
        console.log("CCCD/Hộ chiếu:", passenger.idNumber);
        console.log("Chuyến bay:", passenger.flightNumber);
        console.log("Số ghế:", passenger.seatNumber || "Chưa cấp");
        console.log("Trạng thái:", passenger.isCheckedIn ? "Đã check-in" : "Chưa check-in");
    });
}

function main() {
    let choice;

    do {
        console.log("\n===== QUẢN LÝ HÀNH KHÁCH SÂN BAY =====");
        console.log("1. Thêm hồ sơ hành khách");
        console.log("2. Check-in hành khách");
        console.log("3. In thẻ Boarding Pass");
        console.log("4. Xem danh sách hành khách");
        console.log("0. Thoát chương trình");

        choice = prompt("Nhập lựa chọn của bạn:");

        switch (choice) {
            case "1":
                addPassenger();
                break;
            case "2":
                checkInPassenger();
                break;
            case "3":
                printBoardingPass();
                break;
            case "4":
                listPassengers();
                break;
            case "0":
                console.log("Đã thoát chương trình!");
                break;
            default:
                console.log("Lựa chọn không hợp lệ!");
        }
    } while (choice !== "0");
}

main();

