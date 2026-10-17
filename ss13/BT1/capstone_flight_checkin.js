// Quan ly ve may bay va hanh ly ky gui

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ham nhap du lieu
function nhap(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

// Danh sach ve may bay
let tickets = [
    {
        pnr: "VN001",
        ten: "Nguyen Van An",
        chuyenBay: "VN220",
        diemDen: "Ha Noi",
        ghe: "12A",
        hangVe: "ECONOMY",
        canNang: 0,
        phiHanhLy: 0,
        trangThai: "BOOKED"
    },
    {
        pnr: "VN002",
        ten: "Tran Thi Binh",
        chuyenBay: "VN221",
        diemDen: "Da Nang",
        ghe: "14C",
        hangVe: "BUSINESS",
        canNang: 0,
        phiHanhLy: 0,
        trangThai: "BOOKED"
    },
    {
        pnr: "VN003",
        ten: "Le Minh Chau",
        chuyenBay: "VN222",
        diemDen: "TP Ho Chi Minh",
        ghe: "18B",
        hangVe: "ECONOMY",
        canNang: 0,
        phiHanhLy: 0,
        trangThai: "BOOKED"
    },
    {
        pnr: "VN004",
        ten: "Pham Quoc Dung",
        chuyenBay: "VN223",
        diemDen: "Hue",
        ghe: "3D",
        hangVe: "BUSINESS",
        canNang: 0,
        phiHanhLy: 0,
        trangThai: "BOOKED"
    },
    {
        pnr: "VN005",
        ten: "Vo Ngoc Ha",
        chuyenBay: "VN224",
        diemDen: "Phu Quoc",
        ghe: "20A",
        hangVe: "ECONOMY",
        canNang: 0,
        phiHanhLy: 0,
        trangThai: "BOOKED"
    }
];

// Tim ve theo ma PNR
function findTicketByPnr(pnr) {
    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].pnr === pnr.toUpperCase()) {
            return tickets[i];
        }
    }

    return null;
}

// Tinh phi hanh ly qua can
function calculateExcessBaggageFee(canNang, hangVe) {
    let dinhMuc;

    if (hangVe === "ECONOMY") {
        dinhMuc = 20;
    } else {
        dinhMuc = 30;
    }

    let quaCan = canNang - dinhMuc;

    if (quaCan < 0) {
        quaCan = 0;
    }

    let phi = quaCan * 50000;

    return {
        dinhMuc: dinhMuc,
        quaCan: quaCan,
        phi: phi
    };
}

// Hien thi danh sach ve
function listTickets() {
    console.log("\n========== DANH SACH VE MAY BAY ==========");

    console.log(
        "PNR".padEnd(8) +
        "Ten hanh khach".padEnd(23) +
        "Chuyen bay".padEnd(13) +
        "Diem den".padEnd(20) +
        "Hang ve".padEnd(12) +
        "Trang thai"
    );

    console.log("-".repeat(90));

    for (let i = 0; i < tickets.length; i++) {
        let ve = tickets[i];

        console.log(
            ve.pnr.padEnd(8) +
            ve.ten.padEnd(23) +
            ve.chuyenBay.padEnd(13) +
            ve.diemDen.padEnd(20) +
            ve.hangVe.padEnd(12) +
            ve.trangThai
        );
    }

    console.log("==========================================\n");
}

// Hien thi the len may bay
function displayBoardingPass(ve) {
    console.log("\n========== THE LEN MAY BAY ==========");
    console.log("Ma PNR: " + ve.pnr);
    console.log("Ten hanh khach: " + ve.ten);
    console.log("Chuyen bay: " + ve.chuyenBay);
    console.log("Diem den: " + ve.diemDen);
    console.log("So ghe: " + ve.ghe);
    console.log("Hang ve: " + ve.hangVe);
    console.log("Can nang hanh ly: " + ve.canNang + " kg");
    console.log(
        "Phi hanh ly: " + ve.phiHanhLy.toLocaleString("vi-VN") + " VND"
    );
    console.log("Trang thai: " + ve.trangThai);
    console.log("=====================================\n");
}

// Check-in hanh khach
async function checkIn() {
    let pnr = (await nhap("Nhap ma PNR: ")).toUpperCase();

    // Kiem tra ma PNR
    if (!/^[A-Z0-9]{3,10}$/.test(pnr)) {
        console.log("Ma PNR khong hop le!");
        return;
    }

    let ve = findTicketByPnr(pnr);

    if (ve === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ve.trangThai !== "BOOKED") {
        console.log("Ve khong the check-in!");
        console.log("Trang thai hien tai: " + ve.trangThai);
        return;
    }

    let canNang;

    while (true) {
        let nhapCan = await nhap("Nhap can nang hanh ly (kg): ");
        canNang = Number(nhapCan);

        if (
            nhapCan !== "" &&
            Number.isFinite(canNang) &&
            canNang >= 0
        ) {
            break;
        }

        console.log("Can nang khong hop le, vui long nhap lai!");
    }

    let ketQua = calculateExcessBaggageFee(canNang, ve.hangVe);

    console.log("Dinh muc mien phi: " + ketQua.dinhMuc + " kg");
    console.log("Can nang hanh ly: " + canNang + " kg");
    console.log("So kg qua can: " + ketQua.quaCan + " kg");
    console.log(
        "Phi qua can: " + ketQua.phi.toLocaleString("vi-VN") + " VND"
    );

    let xacNhan = (await nhap("Xac nhan check-in? (Y/N): ")).toUpperCase();

    if (xacNhan !== "Y") {
        console.log("Da huy thao tac check-in!");
        return;
    }

    ve.canNang = canNang;
    ve.phiHanhLy = ketQua.phi;
    ve.trangThai = "CHECKED_IN";

    console.log("Check-in thanh cong!");

    displayBoardingPass(ve);
}

// Tim kiem ve theo PNR hoac ten
async function searchTicket() {
    let tuKhoa = await nhap("Nhap ma PNR hoac ten hanh khach: ");

    if (tuKhoa === "") {
        console.log("Khong duoc de trong thong tin tim kiem!");
        return;
    }

    let ve = findTicketByPnr(tuKhoa.toUpperCase());

    if (ve !== null) {
        displayBoardingPass(ve);
        return;
    }

    let timThay = false;

    for (let i = 0; i < tickets.length; i++) {
        if (
            tickets[i].ten.toLowerCase().includes(tuKhoa.toLowerCase())
        ) {
            displayBoardingPass(tickets[i]);
            timThay = true;
        }
    }

    if (timThay === false) {
        console.log("Khong tim thay ve!");
    }
}

// Huy ve may bay
async function cancelTicket() {
    let pnr = (await nhap("Nhap ma PNR can huy: ")).toUpperCase();

    if (!/^[A-Z0-9]{3,10}$/.test(pnr)) {
        console.log("Ma PNR khong hop le!");
        return;
    }

    let ve = findTicketByPnr(pnr);

    if (ve === null) {
        console.log("Khong tim thay ve!");
        return;
    }

    if (ve.trangThai === "CANCELLED") {
        console.log("Ve nay da duoc huy truoc do!");
        return;
    }

    console.log("Ten hanh khach: " + ve.ten);
    console.log("Chuyen bay: " + ve.chuyenBay);

    let xacNhan = (
        await nhap("Ban co chac chan muon huy ve? (Y/N): ")
    ).toUpperCase();

    if (xacNhan === "Y") {
        ve.trangThai = "CANCELLED";
        console.log("Huy ve thanh cong!");
    } else {
        console.log("Da huy thao tac!");
    }
}

// Menu chinh
function hienThiMenu() {
    console.log("\n======================================");
    console.log(" QUAN LY VE MAY BAY VA HANH LY");
    console.log("======================================");
    console.log("1. Hien thi danh sach ve");
    console.log("2. Check-in hanh khach");
    console.log("3. Tim kiem ve");
    console.log("4. Huy ve");
    console.log("5. Thoat chuong trinh");
    console.log("======================================");
}

// Ham main
async function main() {
    let chon;

    do {
        hienThiMenu();

        chon = await nhap("Nhap lua chon cua ban: ");

        switch (chon) {
            case "1":
                listTickets();
                break;

            case "2":
                await checkIn();
                break;

            case "3":
                await searchTicket();
                break;

            case "4":
                await cancelTicket();
                break;

            case "5":
                console.log("Da thoat chuong trinh!");
                break;

            default:
                console.log("Lua chon khong hop le!");
        }

    } while (chon !== "5");

    rl.close();
}

// Chay chuong trinh
main().catch((error) => {
    console.log("Co loi xay ra:", error);
    rl.close();
});