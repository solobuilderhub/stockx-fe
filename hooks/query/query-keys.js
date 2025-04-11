export const CATERER_QUERY_KEYS = {
    all: ["caterers"],
    list: (filters) => ["caterers", "list", filters],
    profile: ["caterers", "profile"],
    detail: (id) => ["caterers", id],
    profilePhoto: (id) => ["caterers", id, "profile-photo"],
    coverPhoto: (id) => ["caterers", id, "cover-photo"],
    myProfile: ["caterers", "my-profile"],
    nearby: (filters) => ["caterers", "nearby", filters],
  };
  