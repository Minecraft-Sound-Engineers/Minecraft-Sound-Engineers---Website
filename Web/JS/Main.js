let color = 'black'

function showSideBar() {
  document.querySelector('.sidebar').classList.add('open');
}

function hideSideBar() {
  document.querySelector('.sidebar').classList.remove('open');
}

function changecolor () {
  let header = document.getElementById('header');
  let colorselect = document.getElementById('colorselect');
  let selectedcolor = colorselect.value;
  header.style.backgroundColor = selectedcolor;
};