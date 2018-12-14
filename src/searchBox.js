// https://codepen.io/nikhil/pen/aJtHk
function buttonUp(){
  var valux = $('.sb-search-input').val() 
  var valuxLength = $.trim(valux).length
  if(valuxLength !== 0){
    $('.sb-search-submit').css('z-index','99')
  } else{
    $('.sb-search-input').val('') 
    // $('.sb-search-submit').css('z-index','-995')
  }
}

$(document).ready(function(){
  var submitIcon = $('.sb-icon-search')
  var submitInput = $('.sb-search-input')
  var submitButton = $('.sb-search-submit')
  var searchBox = $('.sb-search')
  var isOpen = false
    
  $(document).mouseup(function(){
    if(isOpen == true){
      // submitInput.val('')
      $('.sb-search-submit').css('z-index','-995')
      submitIcon.click()
    }
  })
    
  submitIcon.mouseup(function(){
    // var html = "<p>" + $('.sb-search-input').val() + "</p>"
    // $('#stationFrom').html(html)
    submitButton.css('z-index', '99')
    submitInput.val('')
    return false
  })

  submitButton.mouseup(function(){
    var start = $('.sb-search-input').val()
    $('#dummy').val(start)
    console.log("search");
    // $('#loading').css('display', 'inherit')
    afterSearch()
  })
    
  searchBox.mouseup(function(){
    return false
  })
            
  submitIcon.click(function(){
    if(isOpen == false){
      searchBox.addClass('sb-search-open')
      isOpen = true
    } else {
      searchBox.removeClass('sb-search-open')
      isOpen = false
    }
  })

})