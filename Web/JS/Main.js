function showSideBar() {
            document.querySelector('.sidebar').classList.add('open');
            document.getElementById('overlay').classList.add('show');
            document.getElementById('content').classList.add('shift');
        }

        function hideSideBar() {
            document.querySelector('.sidebar').classList.remove('open');
            document.getElementById('overlay').classList.remove('show');
            document.getElementById('content').classList.remove('shift');
        }

        document.getElementById('overlay').addEventListener('click', hideSideBar);
