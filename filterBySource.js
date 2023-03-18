export const filterBySource = (data, source) => {
  if (source === "twitter") return [];

  if (source === "instagram") {
    return data.filter((card) => card.source_type === "instagram");
  } else if (source === "facebook") {
    return data.filter((card) => card.source_type === "facebook");
  } else {
    return data;
  }
};
