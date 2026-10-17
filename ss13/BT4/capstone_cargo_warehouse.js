
let cargoList = [];
const flightNumber = "VN-210";
const maxCapacity = 5000;

function addCargo() {
    let id = prompt("Nhập mã kiện hàng:");

    if (!id || !id.trim()) {
        console.log("Mã kiện hàng không được để trống!");
        return;
    }

    id = id.trim().toUpperCase();

    if (cargoList.some(cargo => cargo.id === id)) {
        console.log("Mã kiện hàng đã tồn tại!");
        return;
    }

    let name = prompt("Nhập tên kiện hàng:");

    if (!name || !name.trim()) {
        console.log("Tên kiện hàng không được để trống!");
        return;
    }

    let type = prompt(
        "Nhập loại hàng:\n1. Thực phẩm tươi sống\n2. Đồ điện tử / Thủy tinh\n3. Hành lý vali thường"
    );

    let zone;

    switch (type) {
        case "1":
            type = "Thực phẩm tươi sống";
            zone = "ZONE_COLD";
            break;
        case "2":
            type = "Đồ điện tử / Thủy tinh";
            zone = "ZONE_FRAGILE";
            break;
        case "3":
            type = "Hành lý vali thường";
            zone = "ZONE_STANDARD";
            break;
        default:
            console.log("Loại hàng không hợp lệ!");
            return;
    }

    let weight = Number(prompt("Nhập trọng lượng kiện hàng (kg):"));

    if (!Number.isFinite(weight) || weight <= 0) {
        console.log("Trọng lượng phải là số lớn hơn 0!");
        return;
    }

    const totalWeight = cargoList.reduce(
        (total, cargo) => total + cargo.weight,
        0
    );

    if (totalWeight + weight > maxCapacity) {
        console.log("Từ chối nhận kiện hàng vì vượt tải trọng 5000 kg!");
        return;
    }

    const cargo = {
        id: id,
        name: name.trim(),
        type: type,
        weight: weight,
        zone: zone,
        flightNumber: flightNumber
    };

    cargoList.push(cargo);

    console.log("Nhập kiện hàng thành công!");
    console.log(cargo);

    checkCapacity();
}

function showInventory() {
    if (cargoList.length === 0) {
        console.log("Kho chưa có kiện hàng!");
        return;
    }

    const zones = ["ZONE_COLD", "ZONE_FRAGILE", "ZONE_STANDARD"];

    for (let i = 0; i < zones.length; i++) {
        console.log("\n========== " + zones[i] + " ==========");

        const zoneList = cargoList.filter(
            cargo => cargo.zone === zones[i]
        );

        if (zoneList.length === 0) {
            console.log("Không có kiện hàng!");
        } else {
            zoneList.forEach((cargo, index) => {
                console.log(
                    `${index + 1}. Mã: ${cargo.id} | ` +
                    `Tên: ${cargo.name} | ` +
                    `Loại: ${cargo.type} | ` +
                    `Trọng lượng: ${cargo.weight} kg`
                );
            });
        }
    }
}

function checkCapacity() {
    const totalWeight = cargoList.reduce(
        (total, cargo) => total + cargo.weight,
        0
    );

    const percentage = totalWeight / maxCapacity * 100;

    console.log("\n===== KIỂM TRA TẢI TRỌNG =====");
    console.log("Chuyến bay:", flightNumber);
    console.log("Tổng trọng lượng:", totalWeight, "kg");
    console.log("Tải trọng tối đa:", maxCapacity, "kg");
    console.log("Mức sử dụng:", percentage.toFixed(2) + "%");

    if (totalWeight > maxCapacity) {
        console.log("CẢNH BÁO: VƯỢT QUÁ TẢI TRỌNG AN TOÀN!");
    } else if (totalWeight > maxCapacity * 0.85) {
        console.log("\x1b[33mCẢNH BÁO VÀNG: TẢI TRỌNG VƯỢT 85%!\x1b[0m");
    } else {
        console.log("Tải trọng trong giới hạn cho phép.");
    }
}

function printCargoManifest() {
    if (cargoList.length === 0) {
        console.log("Không có kiện hàng để xuất Cargo Manifest!");
        return;
    }

    let totalWeight = 0;

    console.log("\n==============================================================");
    console.log("                  CARGO MANIFEST - " + flightNumber);
    console.log("==============================================================");
    console.log(
        "STT".padEnd(5) +
        "MA KIEN".padEnd(15) +
        "TEN HANG".padEnd(22) +
        "PHAN KHU".padEnd(18) +
        "KG"
    );
    console.log("--------------------------------------------------------------");

    cargoList.forEach((cargo, index) => {
        console.log(
            String(index + 1).padEnd(5) +
            cargo.id.padEnd(15) +
            cargo.name.slice(0, 20).padEnd(22) +
            cargo.zone.padEnd(18) +
            String(cargo.weight)
        );

        totalWeight += cargo.weight;
    });

    console.log("--------------------------------------------------------------");
    console.log("Tổng số kiện hàng:", cargoList.length);
    console.log("Tổng trọng lượng:", totalWeight, "kg");
    console.log("Tải trọng tối đa:", maxCapacity, "kg");
    console.log("==============================================================");
}

function main() {
    let choice;

    do {
        console.log("\n===== QUẢN LÝ KHO HÀNG HÓA HÀNG KHÔNG =====");
        console.log("1. Nhập kiện hàng mới vào kho");
        console.log("2. Xuất bảng kiểm kê theo phân khu");
        console.log("3. Kiểm tra tải trọng chuyến bay");
        console.log("4. Xuất Cargo Manifest");
        console.log("0. Thoát chương trình");

        choice = prompt("Nhập lựa chọn của bạn:");

        switch (choice) {
            case "1":
                addCargo();
                break;
            case "2":
                showInventory();
                break;
            case "3":
                checkCapacity();
                break;
            case "4":
                printCargoManifest();
                break;
            case "0":
                console.log("Đã thoát chương trình!");
                break;
            default:
                console.log("Lựa chọn không hợp lệ! Vui lòng nhập lại.");
        }
    } while (choice !== "0");
}

main();

