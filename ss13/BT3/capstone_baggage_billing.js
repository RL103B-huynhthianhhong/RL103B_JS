
const ticket = {
    passengerName: "Nguyen Van An",
    ticketClass: "Economy",
    baggageLimit: 20,
    membership: "Titan"
};

const baggageList = [
    {
        name: "Vali",
        weight: 18,
        type: "normal"
    },
    {
        name: "Thung hang",
        weight: 5,
        type: "bulky"
    },
    {
        name: "Long thu cung",
        weight: 4,
        type: "pet"
    },
    {
        name: "Hop do de vo",
        weight: 3,
        type: "fragile"
    }
];

function calculateBaggageSurcharge(ticket, baggageList) {
    let totalWeight = 0;
    let bulkyFee = 0;
    let petFee = 0;
    let fragileCount = 0;
    let bulkyCount = 0;
    let petCount = 0;

    for (let i = 0; i < baggageList.length; i++) {
        totalWeight += baggageList[i].weight;

        if (baggageList[i].type === "bulky") {
            bulkyFee += 200000;
            bulkyCount++;
        } else if (baggageList[i].type === "pet") {
            petFee += 500000;
            petCount++;
        } else if (baggageList[i].type === "fragile") {
            fragileCount++;
        }
    }

    let freeWeight = ticket.baggageLimit;

    if (ticket.membership === "Titan" ||
        ticket.membership === "Gold" ||
        ticket.membership === "Platinum") {
        freeWeight += 10;
    }

    let excessWeight = Math.max(0, totalWeight - freeWeight);
    let excessFee = 0;

    if (excessWeight <= 5) {
        excessFee = excessWeight * 60000;
    } else {
        excessFee = 5 * 60000 + (excessWeight - 5) * 80000;
    }

    const totalFee = excessFee + bulkyFee + petFee;

    return {
        passengerName: ticket.passengerName,
        ticketClass: ticket.ticketClass,
        totalWeight: totalWeight,
        freeWeight: freeWeight,
        excessWeight: excessWeight,
        excessFee: excessFee,
        bulkyCount: bulkyCount,
        bulkyFee: bulkyFee,
        petCount: petCount,
        petFee: petFee,
        fragileCount: fragileCount,
        totalFee: totalFee,
        baggageList: baggageList
    };
}

function printReceipt(result) {
    console.log("==================================================");
    console.log("              BAGGAGE PAYMENT RECEIPT             ");
    console.log("==================================================");
    console.log(`Hanh khach       : ${result.passengerName}`);
    console.log(`Hang ve          : ${result.ticketClass}`);
    console.log("--------------------------------------------------");
    console.log(`Tong trong luong : ${result.totalWeight} kg`);
    console.log(`Mien cuoc         : ${result.freeWeight} kg`);
    console.log(`Vuot cuoc         : ${result.excessWeight} kg`);
    console.log("--------------------------------------------------");
    console.log("CHI TIET PHU THU");
    console.log(`Phi qua cuoc      : ${result.excessFee.toLocaleString("vi-VN")} VND`);
    console.log(`Hanh ly cong kenh : ${result.bulkyCount} kien`);
    console.log(`Phi cong kenh     : ${result.bulkyFee.toLocaleString("vi-VN")} VND`);
    console.log(`Thu cung          : ${result.petCount} long`);
    console.log(`Phi thu cung      : ${result.petFee.toLocaleString("vi-VN")} VND`);
    console.log(`Do de vo          : ${result.fragileCount} kien`);
    console.log("--------------------------------------------------");
    console.log(`TONG THANH TOAN   : ${result.totalFee.toLocaleString("vi-VN")} VND`);
    console.log("==================================================");
    console.log("              CAM ON QUY KHACH                   ");
    console.log("==================================================");
}

function main() {
    const result = calculateBaggageSurcharge(ticket, baggageList);
    printReceipt(result);
}

main();
