function timeBarSelected () {
    document.getElementById("inputTime").style.display = "none"
    document.getElementById("timeBarButton").style.display = "none"
    document.getElementById("inputGo").style.display = "none"
    document.getElementById("slideBarTime").style.display = "inline-block"
    document.getElementById("timeDesignateButton").style.display = "inline-block"
    document.getElementById("inputGo").value = "0"
}
function timeDesignateSelected () {
    document.getElementById("inputTime").style.display = "inline-block"
    document.getElementById("timeBarButton").style.display = "inline-block"
    document.getElementById("inputGo").style.display = "inline-block"
    document.getElementById("slideBarTime").style.display = "none"
    document.getElementById("timeDesignateButton").style.display = "none"
    document.getElementById("inputGo").value = "1"
}
