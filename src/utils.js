import * as XLSX from 'xlsx-js-style';

export const formatDate = (date) => {
  const newDate = new Date(date);
  const pad = (num, size) => num.toString().padStart(size, '0');

  const year = newDate.getFullYear();
  const month = pad(newDate.getMonth() + 1, 2);
  const day = pad(newDate.getDate(), 2);
  const hours = pad(newDate.getHours(), 2);
  const minutes = pad(newDate.getMinutes(), 2);

  return `${day}.${month}.${year}  ${!!hours && `${hours}:${minutes}`}`;
};

export const handleExcelFileExport = (payments, chosenPayments) => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet([]);

  let rowIndex = 1;

  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        'Номер платежа',
        'Время проведения платежа',
        'Лицевой счет',
        'Деньги',
        'Статус платежа',
        'Сервис инженер',
      ],
    ],
    { origin: `A1` }
  );

  payments.forEach((payment) => {
    if (!chosenPayments.includes(payment.number_payment)) return;

    rowIndex += 1;

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          payment.number_payment || '-',
          payment.date_payment || '-',
          payment.ls_abon || '-',
          payment.money || 0,
          payment.status_payment || '-',
          payment.user_name || '-',
        ],
      ],
      { origin: `A${rowIndex}` }
    );
  });

  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 17 },
    { wch: 14 },
    { wch: 20 },
    { wch: 25 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Платежи');

  XLSX.writeFile(workbook, 'Платежи.xlsx');
};

export const handleNewVersionExcelFileExport = (payments) => {
  let totalLocalPaySum = 0;
  let totalPlanUpSum = 0;

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet([]);

  let rowIndex = 1;

  [...payments?.slice(0, payments?.length - 1)]?.forEach((payment) => {
    const userName = `Платежи пользователя: ${payment?.name || '-'} ${payment?.surname || '-'}`;
    XLSX.utils.sheet_add_aoa(worksheet, [[userName]], {
      origin: `A${rowIndex}`,
    });

    worksheet['!merges'] = worksheet['!merges'] || [];
    worksheet['!merges'].push({
      s: {
        r: rowIndex - 1,
        c: 0,
      },
      e: {
        r: rowIndex - 1,
        c: 5,
      },
    });

    const cellAddress = XLSX.utils.encode_cell({
      r: rowIndex - 1,
      c: 0,
    });
    worksheet[cellAddress].s = {
      alignment: {
        horizontal: 'center',
        vertical: 'center',
      },
      font: {
        bold: true,
      },
    };

    rowIndex += 1;

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          'Время проведения платежа',
          'Время платежа PlanUp',
          'Лицевой счет',
          'Баланс в ЛокалПэй',
          'Баланс в Планап',
          'Статус платежа',
        ],
      ],
      { origin: `A${rowIndex}` }
    );

    rowIndex += 1;

    payment?.payments.forEach((singleUserPayment) => {
      XLSX.utils.sheet_add_aoa(
        worksheet,
        [
          [
            singleUserPayment.date_payment || '-',
            singleUserPayment.end_date || '-',
            singleUserPayment.ls_abon || '-',
            singleUserPayment.localpay_money || 0,
            singleUserPayment.planup_money || 0,
            singleUserPayment.status_payment || '-',
            !!singleUserPayment?.planup_id
              ? `http://planup.skynet.kg:8000/planup/work/${singleUserPayment?.planup_id}/`
              : '-',
          ],
        ],
        { origin: `A${rowIndex}` }
      );
      rowIndex += 1;
    });

    const sumLocalPayMoney = payment?.payments.reduce((total, payment) => {
      return (
        total +
        (Number.isInteger(Number(payment?.localpay_money)) &&
        payment?.status_payment === 'Выполнен'
          ? Number(payment?.localpay_money)
          : 0)
      );
    }, 0);
    const sumPlanUpMoney = payment?.payments.reduce((total, payment) => {
      return (
        total +
        (Number.isInteger(Number(payment?.planup_money)) &&
        payment?.status_payment === 'Выполнен'
          ? Number(payment?.planup_money)
          : 0)
      );
    }, 0);

    totalLocalPaySum += sumLocalPayMoney;
    totalPlanUpSum += sumPlanUpMoney;

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          '',
          '',
          `сумма: ${sumLocalPayMoney}`,
          `сумма: ${sumPlanUpMoney}`,
          '',
          '',
        ],
      ],
      { origin: `A${rowIndex}` }
    );

    rowIndex += 2;
  });

  rowIndex += 2;

  XLSX.utils.sheet_add_aoa(
    worksheet,
    [
      [
        '',
        '',
        `Итоговая сумма: ${totalLocalPaySum}`,
        `Итоговая сумма: ${totalPlanUpSum}`,
        '',
        '',
      ],
    ],
    { origin: `A${rowIndex}` }
  );

  const localPaySumCell = XLSX.utils.encode_cell({
    r: rowIndex - 1,
    c: 2,
  });
  const planUpSumCell = XLSX.utils.encode_cell({
    r: rowIndex - 1,
    c: 3,
  });

  worksheet[localPaySumCell].s = {
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },
    font: {
      bold: true,
    },
  };
  worksheet[planUpSumCell].s = {
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },
    font: {
      bold: true,
    },
  };

  worksheet['!cols'] = [
    { wch: 35 },
    { wch: 35 },
    { wch: 17 },
    { wch: 23 },
    { wch: 23 },
    { wch: 20 },
    { wch: 25 },
  ];

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Платежи по пользователям');

  XLSX.writeFile(workbook, 'Платежи по пользователям.xlsx');
};
