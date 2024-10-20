let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// get total
function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
  }
}

// create
let dataproducts;

if (localStorage.products != null) {
  dataproducts = JSON.parse(localStorage.products);
} else {
  dataproducts = [];
}

submit.onclick = function () {
  let newproducts = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newproducts.count > 1) {
      for (let i = 0; i < newproducts.count; i++) {
        dataproducts.push(newproducts);
      }
    } else {
      dataproducts.push(newproducts);
    }
  } else {
    dataproducts[tmp] = newproducts;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "inline";
  }

  // save data

  localStorage.setItem("products", JSON.stringify(dataproducts));

  cleardata();
  showData();
};

// clear after create

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function showData() {
  let table = "";
  for (let i = 0; i < dataproducts.length; i++) {
    table += `
  <tr>
                            <td>${i}</td>
                            <td>${dataproducts[i].title}</td>
                            <td>${dataproducts[i].price}</td>
                            <td>${dataproducts[i].taxes}</td>
                            <td>${dataproducts[i].ads}</td>
                            <td>${dataproducts[i].discount}</td>
                            <td>${dataproducts[i].total}</td>
                            <td>${dataproducts[i].category}</td>
                            <td><button onclick= " updateData( ${i} )" id="update">update</button></td>
                            <td><button onclick= " delateData( ${i} )" id="delate">delate</button></td>
</tr>
  `;
  }
  document.getElementById("tbody").innerHTML = table;
  let buttondelateall = document.getElementById("delateall");
  if (dataproducts.length > 0) {
    buttondelateall.innerHTML = `
    <button onclick="delateAll()">delate All</button>
    `;
  } else {
    buttondelateall.innerHTML = ``;
  }
}
showData();

// delate
function delateData(i) {
  dataproducts.splice(i, 1);
  localStorage.products = JSON.stringify(dataproducts);
  showData();
}
showData();

// delateAll

function delateAll() {
  localStorage.clear();
  dataproducts.splice(0);
  showData();
}

// count

// update
function updateData(i) {
  title.value = dataproducts[i].title;
  price.value = dataproducts[i].price;
  taxes.value = dataproducts[i].taxes;
  ads.value = dataproducts[i].ads;
  discount.value = dataproducts[i].discount;
  gettotal;
  count.style.display = "none";
  category.value = dataproducts[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
  });
}

// search
let searchMood = "title";

function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchdata(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataproducts.length; i++) {
      if (dataproducts[i].title.includes(value.toLowercase())) {
        table += `
      <tr>
                                <td>${i}</td>
                                <td>${dataproducts[i].title}</td>
                                <td>${dataproducts[i].price}</td>
                                <td>${dataproducts[i].taxes}</td>
                                <td>${dataproducts[i].ads}</td>
                                <td>${dataproducts[i].discount}</td>
                                <td>${dataproducts[i].total}</td>
                                <td>${dataproducts[i].category}</td>
                                <td><button onclick= " updateData( ${i} )" id="update">update</button></td>
                                <td><button onclick= " delateData( ${i} )" id="delate">delate</button></td>
    </tr>
      `;
      }
    }
  } else {
    for (let i = 0; i < dataproducts.length; i++) {
      if (dataproducts[i].category.includes(value.toLowercase())) {
        table += `
      <tr>
                                <td>${i}</td>
                                <td>${dataproducts[i].title}</td>
                                <td>${dataproducts[i].price}</td>
                                <td>${dataproducts[i].taxes}</td>
                                <td>${dataproducts[i].ads}</td>
                                <td>${dataproducts[i].discount}</td>
                                <td>${dataproducts[i].total}</td>
                                <td>${dataproducts[i].category}</td>
                                <td><button onclick= " updateData( ${i} )" id="update">update</button></td>
                                <td><button onclick= " delateData( ${i} )" id="delate">delate</button></td>
    </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
