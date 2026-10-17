
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const subscriptions = [
    {
        subscriptionId: 'SUB01',
        customerName: 'Nguyen Van A',
        planTier: 'Standard',
        price: 120000,
        deviceLimit: 2
    },
    {
        subscriptionId: 'SUB02',
        customerName: 'Tran Thi B',
        planTier: 'Family',
        price: 250000,
        deviceLimit: 5
    }
];

function input(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer.trim());
        });
    });
}

async function addSub() {
    const customerName = await input('Nhap ten khach hang: ');

    if (customerName === '') {
        console.log('Ten khach hang khong duoc de trong!');
        return;
    }

    const subscriptionId = 'SUB' + String(subscriptions.length + 1).padStart(2, '0');

    subscriptions.push({
        subscriptionId: subscriptionId,
        customerName: customerName,
        planTier: 'Standard',
        price: 120000,
        deviceLimit: 2
    });

    console.log('Them thue bao thanh cong!');
    console.log('Ma thue bao:', subscriptionId);
}

function listSubs() {
    if (subscriptions.length === 0) {
        console.log('Danh sach thue bao trong!');
        return;
    }

    console.table(subscriptions);
}

async function upgradeSub() {
    const subscriptionId = await input('Nhap ma thue bao can nang cap: ');
    let found = false;

    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].subscriptionId === subscriptionId) {
            found = true;

            subscriptions[i].planTier = 'Family';
            subscriptions[i].price = 250000;
            subscriptions[i].deviceLimit = 5;

            console.log('Nang cap goi cuoc thanh cong!');
            console.log('Ma thue bao:', subscriptions[i].subscriptionId);
            console.log('Goi moi: Family');
            console.log('Don gia: 250000 VND');
            console.log('Gioi han thiet bi: 5');
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
        console.log('\n===== RIKKEISTREAM SUBSCRIPTION =====');
        console.log('1. Them thue bao moi');
        console.log('2. Hien thi danh sach thue bao');
        console.log('3. Nang cap goi cuoc');
        console.log('4. Thoat chuong trinh');

        menuChoice = await input('Nhap lua chon (1-4): ');

        switch (menuChoice) {
            case '1':
                await addSub();
                break;

            case '2':
                listSubs();
                break;

            case '3':
                await upgradeSub();
                break;

            case '4':
                console.log('Da thoat chuong trinh!');
                break;

            default:
                console.log('Lua chon khong hop le! Vui long chon tu 1 den 4.');
        }
    } while (menuChoice !== '4');

    rl.close();
}

main();
