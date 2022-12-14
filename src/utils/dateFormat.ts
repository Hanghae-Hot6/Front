export const modifyDateFormat = (dateInput: Date) => {
  const happyNewYear = dateInput;
  const year = happyNewYear.getFullYear();
  const month = happyNewYear.getMonth() + 1;
  const date = happyNewYear.getDate();

  return `${year}-${month >= 10 ? month : '0' + month}-${
    date >= 10 ? date : '0' + date
  }`;
};

export const convertChatDateToDateObject = (
  givenDate: string = '2022년 12월 08일 목요일 오전 05:02:09',
) => {
  const chatDateSplit = givenDate.split(' ');
  let chatYear1 = chatDateSplit[0];
  let chatMonth1 = chatDateSplit[1];
  let chatDate1 = chatDateSplit[2];
  let chatMorningOrAfternoon1 = chatDateSplit[4];
  let chatTime1 = chatDateSplit[5];

  let chatYear2 = chatYear1.split('');
  chatYear2.pop();
  let chatMonth2 = chatMonth1.split('');
  chatMonth2.pop();
  let chatDate2 = chatDate1.split('');
  chatDate2.pop();

  let chatYear3 = parseInt(chatYear2.join(''));
  let chatMonth3 = parseInt(chatMonth2.join(''));
  let chatDate3 = parseInt(chatDate2.join(''));

  let chatTime2 = chatTime1.split(':');

  let chatTime3;

  if (chatMorningOrAfternoon1 === '오후') {
    chatTime3 = [
      parseInt(chatTime2[0]) + 12,
      parseInt(chatTime2[1]),
      parseInt(chatTime2[2]),
    ];
  } else {
    chatTime3 = [
      parseInt(chatTime2[0]),
      parseInt(chatTime2[1]),
      parseInt(chatTime2[2]),
    ];
  }

  const chatDate = new Date(
    chatYear3,
    chatMonth3 - 1,
    chatDate3,
    chatTime3[0],
    chatTime3[1],
    chatTime3[2],
  );

  return chatDate;
};

export const minutesPassIndicator = (
  criterionDate: Date,
  compareDate: Date,
) => {
  const subtraction = criterionDate.getTime() - compareDate.getTime();

  if (subtraction < 1000 * 60) {
    // return `${Math.floor(subtraction / 1000)}초전`;
    return `몇 초전`;
  } else if (subtraction >= 1000 * 60 && subtraction < 1000 * 60 * 60) {
    return `${Math.floor(subtraction / (1000 * 60))}분전`;
  } else if (
    subtraction >= 1000 * 60 * 60 &&
    subtraction < 1000 * 60 * 60 * 24
  ) {
    return `${Math.floor(subtraction / (1000 * 60 * 60))}시간전`;
  } else {
    return `${Math.floor(subtraction / (1000 * 60 * 60 * 24))}일전`;
  }
};
