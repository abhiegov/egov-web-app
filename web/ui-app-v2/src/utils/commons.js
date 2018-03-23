import _ from "lodash";

export const hyphenSeperatedDateTime = (d) => {
  return d;
  // function pad2(n) {
  //   return n > 9 ? n : '0' + n;
  // }
  // var year = d.getFullYear();
  // var month = d.getMonth() + 1; // months start at zero
  // var day = d.getDate();
  // var hr = d.getHour();
  // var mn = d.getMinute();
  // var sc = d.getSecond();
  //
  // return `${year}-${pad2(month)}-${pad2(day)} ${hr}:${mn}:${sc}`;
}

export const prepareSearchUrl = (search, id) => {
  const { url: searchUrl, searchKey } = search;
  const tenantId = fetchFromLocalStorage("tenantId");
  const query = [{ key: "tenantId", value: tenantId }];
  if (searchKey && id) {
    query.push({ key: searchKey, value: id });
  }
  return addQueryArg(searchUrl, query);
};

export const addQueryArg = (url, queries = []) => {
  const urlParts = url.split("?");
  const path = urlParts[0];
  let queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach((query) => {
    const key = query.key;
    const value = query.value;
    const newQuery = `${key}=${value}`;
    queryParts.push(newQuery);
  });
  const newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

export const isFieldEmpty = (field) => {
  if (field === undefined || field === null) {
    return true;
  }
  if (typeof field !== "object") {
    field = field.toString().trim();
    return _.isEmpty(field);
  }
  return false;
};

export const slugify = (term) => {
  return term.toLowerCase().replace(/\s+/, "-");
};

export const persistInLocalStorage = (obj) => {
  Object.keys(obj).forEach((objKey) => {
    const objValue = obj[objKey];
    window.localStorage.setItem(objKey, objValue);
  }, this);
};

export const fetchFromLocalStorage = (key) => {
  return window.localStorage.getItem(key) || null;
};

export const getRequestUrl = (url, params) => {
  var query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");

  return url + "?" + query;
};

export const prepareFormData = (params) => {
  var formData = new FormData();

  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

export const getDateFromEpoch = (epoch) => {
  const dateObj = new Date(epoch);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return day + "-" + month + "-" + year;
};

export const getBodyClassFromPath = (path) => {
  let bodyClass = path
    .split("/")
    .filter((part) => part.trim().length > 0)
    .join("-");
  return bodyClass;
};

export const addBodyClass = (path) => {
  const bodyClass = getBodyClassFromPath(path);
  document.body.classList.add(bodyClass);
};

export const removeBodyClass = (path) => {
  const bodyClass = getBodyClassFromPath(path);
  document.body.classList.remove(bodyClass);
};
