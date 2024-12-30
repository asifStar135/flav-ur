import options from "./options";

export const truncateText = (text: string, length: number): string => {
  if (text?.length <= length) return text;
  return text?.substring(0, length - 2)?.trim() + "...";
};

export const getRating = (score: number) => {
  return Number((score / 20).toFixed(1));
};

export const getTime = (minute: number) => {
  if (minute < 60) {
    return `${minute} Mins`;
  } else {
    const hour = minute / 60;
    return `${hour.toFixed(1)} Hrs`;
  }
};

export const getRandomAvatars = () => {
  const avatars = [
    "/assets/av1.png",
    "/assets/av2.png",
    "/assets/av3.png",
    "/assets/av4.png",
    "/assets/av5.png",
    "/assets/av6.png",
    "/assets/av7.png",
    "/assets/av8.png",
    "/assets/av9.png",
    "/assets/av10.png",
    "/assets/av11.png",
    "/assets/av12.png",
  ];
  // sort it in a random order;
  avatars.sort(() => Math.random() - 0.5);
  return avatars;
};

export const collapseSummary = (summary: string) => {
  let ind = 0,
    cnt = 0;

  while (ind < summary?.length) {
    if (summary[ind] == "<" || summary[ind] == ">") cnt++;
    ind++;
    if (ind > 350 && cnt % 4 == 0 && summary[ind] == " ")
      return summary.substring(0, ind);
  }
  return summary;
};

export const Options = { ...options };
