
const subscriptions = [
    { subscriptionId: 'SUB_001', customerName: 'Nguyen Van An', planTier: 'PERSONAL', deviceLimit: 2 },
    { subscriptionId: 'SUB_002', customerName: 'Tran Thi Mai', planTier: 'FAMILY', deviceLimit: 5 },
    { subscriptionId: 'SUB_003', customerName: 'Le Van Nam', planTier: 'PERSONAL', deviceLimit: 2 }
];

function addSubscription() {
    console.log('Chuc nang them thue bao');
}

function listSubscriptions() {
    console.table(subscriptions);
}

function updateSubscription() {
    console.log('Chuc nang cap nhat goi cuoc');
}

function deleteSubscription() {
    console.log('Chuc nang huy thue bao');
}

function calculatePayment() {
    console.log('Chuc nang tinh tien');
}

function showMenu() {
    console.log('\n===== QUAN LY THUE BAO =====');
    console.log('1. Them thue bao');
    console.log('2. Xem danh sach');
    console.log('3. Cap nhat goi cuoc');
    console.log('4. Huy thue bao');
    console.log('5. Tinh tien');
    console.log('0. Thoat');
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer.trim());
        });
    });
}

async function main() {
    let choice;

    do {
        showMenu();
        choice = await input('Nhap lua chon: ');

        switch (choice) {
            case '1':
                addSubscription();
                break;
            case '2':
                listSubscriptions();
                break;
            case '3':
                updateSubscription();
                break;
            case '4':
                deleteSubscription();
                break;
            case '5':
                calculatePayment();
                break;
            case '0':
                console.log('Thoat chuong trinh!');
                break;
            default:
                console.log('Lua chon khong hop le!');
        }
    } while (choice !== '0');

    rl.close();
}

main();
