
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const subscriptions = [
    { subscriptionId: 'SUB_001', customerName: 'Nguyen Van An', planTier: 'PERSONAL', deviceLimit: 2 },
    { subscriptionId: 'SUB_002', customerName: 'Tran Thi Mai', planTier: 'FAMILY', deviceLimit: 5 },
    { subscriptionId: 'SUB_003', customerName: 'Le Van Nam', planTier: 'PERSONAL', deviceLimit: 2 }
];

function input(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer.trim());
        });
    });
}

function addSubscription() {
    return input('Nhap ten khach hang: ').then(customerName => {
        if (customerName === '') {
            console.log('Ten khach hang khong duoc de trong!');
            return;
        }

        return input('Chon goi (1. PERSONAL, 2. FAMILY): ').then(choice => {
            let planTier;
            let deviceLimit;

            if (choice === '1') {
                planTier = 'PERSONAL';
                deviceLimit = 2;
            } else if (choice === '2') {
                planTier = 'FAMILY';
                deviceLimit = 5;
            } else {
                console.log('Lua chon goi khong hop le!');
                return;
            }

            const subscriptionId = 'SUB_' + String(subscriptions.length + 1).padStart(3, '0');

            subscriptions.push({
                subscriptionId: subscriptionId,
                customerName: customerName,
                planTier: planTier,
                deviceLimit: deviceLimit
            });

            console.log('Them thue bao thanh cong!');
            console.log('Ma thue bao:', subscriptionId);
        });
    });
}

function listSubscriptions() {
    if (subscriptions.length === 0) {
        console.log('Danh sach thue bao trong!');
        return;
    }

    console.table(subscriptions);
}

async function updateSubscription() {
    const subscriptionId = await input('Nhap ma thue bao can cap nhat: ');
    let found = false;

    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].subscriptionId === subscriptionId) {
            found = true;

            console.log('1. PERSONAL (2 thiet bi)');
            console.log('2. FAMILY (5 thiet bi)');

            const choice = await input('Chon goi moi: ');

            if (choice === '1') {
                subscriptions[i].planTier = 'PERSONAL';
                subscriptions[i].deviceLimit = 2;
            } else if (choice === '2') {
                subscriptions[i].planTier = 'FAMILY';
                subscriptions[i].deviceLimit = 5;
            } else {
                console.log('Lua chon khong hop le!');
                return;
            }

            console.log('Cap nhat goi cuoc thanh cong!');
            break;
        }
    }

    if (!found) {
        console.log('Khong tim thay ma thue bao!');
    }
}

async function deleteSubscription() {
    const subscriptionId = await input('Nhap ma thue bao can huy: ');
    let found = false;

    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].subscriptionId === subscriptionId) {
            subscriptions.splice(i, 1);
            found = true;
            console.log('Huy thue bao thanh cong!');
            break;
        }
    }

    if (!found) {
        console.log('Khong tim thay ma thue bao!');
    }
}

async function main() {
    let menuChoice;

    do {
        console.log('\n===== QUAN LY THUE BAO RIKKEISTREAM =====');
        console.log('1. Them thue bao moi');
        console.log('2. Xem danh sach thue bao');
        console.log('3. Cap nhat goi cuoc');
        console.log('4. Huy thue bao');
        console.log('5. Thoat chuong trinh');

        menuChoice = await input('Nhap lua chon (1-5): ');

        switch (menuChoice) {
            case '1':
                await addSubscription();
                break;
            case '2':
                listSubscriptions();
                break;
            case '3':
                await updateSubscription();
                break;
            case '4':
                await deleteSubscription();
                break;
            case '5':
                console.log('Da thoat chuong trinh!');
                break;
            default:
                console.log('Lua chon khong hop le! Vui long chon tu 1 den 5.');
        }
    } while (menuChoice !== '5');

    rl.close();
}

main();
