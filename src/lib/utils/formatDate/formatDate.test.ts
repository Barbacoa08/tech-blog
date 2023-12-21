import { formatDate } from "./formatDate";

describe("formatDate", () => {
  // IMPORTANT NOTE: skipping tests that could fail due to unspecified timezones
  // eg, "2020-01-01" could translate to "Dec 31, 2019" or "Jan 1, 2020"

  it("should format a date", () => {
    const date = new Date("2023-02-11T23:53:48.267Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Feb 11, 2023");
  });

  it("should format a date string", () => {
    const date1 = "2023-02-11T23:53:48.267Z";
    const formattedDate2 = formatDate(date1);
    expect(formattedDate2).toBe("Feb 11, 2023");

    const date2 = "2023-02-11T23:53:48.267+07:00";
    const formattedDate3 = formatDate(date2);
    expect(formattedDate3).toBe("Feb 11, 2023");
  });

  it("should return undefined if no date is provided", () => {
    const formattedDate = formatDate();
    expect(formattedDate).toBe("undefined");
  });
});
