function setTextToAppear(replace){
    if (typeof(replace) == 'undefined') {
        replace = "";
    }

    available_cpt_options = document.getElementsByTagName('li');
    for(i=0; i<available_cpt_options.length; i++){
    if (available_cpt_options[i].innerHTML.match('moh_recommend')){
      available_cpt_options[i].style.backgroundColor='#00CD66';

      available_cpt_options[i].onclick = null;
      available_cpt_options[i].setAttribute("pos", i)
      available_cpt_options[i].onmousedown = function(){
        tmp = this.innerHTML
        this.innerHTML = this.innerHTML.replace(' <span class="moh_recommend">(MoH Recommended)</span>', "")// + replace
        tstFormElements[tstCurrentPage].options[this.getAttribute("pos")].innerHTML = this.innerHTML
        updateTouchscreenInputForSelect(this);
        this.innerHTML=tmp

        unselected_cpt_options = removeFromArray(available_cpt_options, this);
        for(i=0; i<unselected_cpt_options.length; i++){
            if (unselected_cpt_options[i].innerHTML.match('moh_recommend')){
                unselected_cpt_options[i].style.backgroundColor='#00CD66';
            }
        }
      }
    }
    else {
      available_cpt_options[i].onmousedown = function(){
	  updateTouchscreenInputForSelect(this);
        for(i=0; i<available_cpt_options.length; i++){
		if (available_cpt_options[i].innerHTML.match('moh_recommend')){
      		 available_cpt_options[i].style.backgroundColor='#00CD66'
          	}
        }
      }
    }
  }

}
