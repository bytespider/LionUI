(function(window, document){
    var toolbarHandle = document.getElementById('toolbar');

    toolbarHandle.addEventListener('mousedown', function (e){
        var mousePosition = {x:event.clientX, y:event.clientY};

        document.addEventListener('mousemove', drag, false);
        document.addEventListener('mouseup', function (e){
            document.removeEventListener('mousemove', drag, false);
            document.removeEventListener('mouseup', arguments.callee, false);
        }, false);


        function drag(event) {
            var wnd = Titanium.UI.currentWindow;
            var curentPosition = {x:wnd.getX(), y:wnd.getY()};

            curentPosition.x += event.clientX - mousePosition.x;
            curentPosition.y += event.clientY - mousePosition.y;
            wnd.moveTo(curentPosition.x, curentPosition.y);
        }
    }, false);
    
    var resizeHandle = document.getElementById('resizer');

    resizeHandle.addEventListener('mousedown', function (e){
	    var wnd = Titanium.UI.currentWindow;
        var mousePosition = {x:event.clientX, y:event.clientY};
        var windowSize = wnd.getBounds();

        document.addEventListener('mousemove', resize, false);
        document.addEventListener('mouseup', function (e){
            document.removeEventListener('mousemove', resize, false);
            document.removeEventListener('mouseup', arguments.callee, false);
        }, false);


        function resize(event) {
            var width = windowSize.width + event.clientX - mousePosition.x;
            var height = windowSize.height + event.clientY - mousePosition.y;
            
            wnd.setBounds({width:width, height:height, x:windowSize.x, y:windowSize.y});
            
        }
    }, false);

    var domQueries = ['#toolbar [role="button"]', '#toolbar [type="search"]', '#window-controls'];
    domQueries.forEach(addStopEvents);

    function addStopEvents(selector) {
        var ele = document.querySelectorAll(selector);
        for (var i = 0, len = ele.length; i < len; ++i) {
            ele[i].addEventListener('mousedown', stopEvents, true);
        }
    }

    function stopEvents(event) { event.stopPropagation(); }

    window.addEventListener('blur', function (e) {
        document.body.className = 'inactive';
    }, false);
    window.addEventListener('focus', function (e) {
        document.body.className = '';
    }, false);

    document.querySelector('#window-controls .control.close').addEventListener('mouseup', function (e) {Titanium.UI.currentWindow.close()});
    document.querySelector('#window-controls .control.minimize').addEventListener('mouseup', function (e) {Titanium.UI.currentWindow.minimize()});
    document.querySelector('#window-controls .control.maximize').addEventListener('mouseup', function (e) {
    	var hwnd = Titanium.UI.currentWindow;
    	if (hwnd.isMaximized()) {
    		Titanium.UI.currentWindow.unmaximize();
    	} else {
    		Titanium.UI.currentWindow.maximize();
    	}
    });

})(this, document);
