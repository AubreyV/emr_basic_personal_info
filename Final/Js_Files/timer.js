	var StopWatch = function () {
    	this.start_ime = 0;
    	this.stop_ime = 0;
    	this.running = false;
	};

	StopWatch.prototype.current_time = function () {
    	return new Date().getTime();
	};

	StopWatch.prototype.start = function () {
    	this.start_time = this.current_time();
        start_map['page'] = this.start_time;
    	this.running = true;
	};

	StopWatch.prototype.stop = function () {
    	this.stop_time = this.current_time();
        end_map['page'] = this.stop_time;
    	this.running = false;
	};

	StopWatch.prototype.get_elapsed_milliseconds = function () {
    	if (this.running) {
        	this.stop_time = this.current_time();
    	}

    	return this.stop_time - this.start_time;
	};

	StopWatch.prototype.get_elapsed_seconds = function () {
    	return this.get_elapsed_milliseconds() / 1000;
	};

	StopWatch.prototype.print_elapsed = function (name) {
        var time = this.get_elapsed_milliseconds();
        total_map['page'] = time;
        write_to_file(total_map);
	};

	var stopwatch;
    var start_map = {};
    var end_map = {};
    var total_map = {};

	function start_time()
	{
        console.log("start")
		stopwatch = new StopWatch();
		stopwatch.start();
	}

	function end_time()
	{
		stopwatch.stop();
		stopwatch.print_elapsed();
	}

    function active(input) {
        var time = stopwatch.get_elapsed_milliseconds();
        start_map[input.name]=time;
        console.log("active: " + input.name + ", time: " + time);
    }

    function inactive(input) {
        var time = stopwatch.get_elapsed_milliseconds();
        end_map[input.name]=time;
        total(input);
        console.log("inactive: " + input.name + ", time: " + time);
    }

    function total(input) {
        if(total_map[input.name]) {
            total_map[input.name] += end_map[input.name] - start_map[input.name];
        }
        else {
            total_map[input.name] = end_map[input.name] - start_map[input.name];
        }
    }

    function write_to_file(total){
        var json = JSON.stringify(total);
        json = "==time in milliseconds==\n\n" + json;
        var submit = document.getElementById("submit");
        // submit.style.visibility = "hidden";

        // var button = document.createElement("button");
        // var note = document.createElement("p");
        // note.innerHTML = "Please click the <em>Download</em> button after submitting."
        // var go = document.createElement("a");
        // go.innerHTML = "Download";
        // button.appendChild(go);
        // document.body.appendChild(button);
        // document.body.appendChild(note);

        var file = new File([json], {type: "application/octet-stream"});
        submit.href = (URL || webkitURL).createObjectURL(file);
        submit.download = "data.txt";
    }