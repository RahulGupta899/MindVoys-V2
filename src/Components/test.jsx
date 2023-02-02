:root
{
    --blue: #283891 ;
  --white: #fff;
  --gray_light: #f8f4f4;
  --gray_dark: #595959;
}
body
{
  background-color: #f4f4f4 !important;
  font-family: 'Nunito', sans-serif !important;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 15px;
  font-weight: 400;
}
h1,h2,h3,h4,h5,h6
{
  line-height: 1.1 !important;
}
/* comman */
.comman_top
{
  margin-top: 24px;
}
.blue_btn
{
  background-color: #283891  !important;
  color: #fff;
  display: inline-block;
  box-shadow: none !important;
}
/* card style */
.box_style_main
{
  margin-bottom: 24px;
  display: flex;
}
.box_style
{
  background-color: #fff;
  width: 100%;
  padding: 25px 15px;
  border: 1px solid #dedddd;
  border-radius: 9px;
}
.box_style .box_style_head
{
  /* border-bottom: 1px solid #e3e6e8; */
  
  margin: 0 0 20px 0;
}
.box_style .box_style_head.two_coll
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.box_style .box_style_head h2
{
  font-size: 18px;
  color: #0e1726;
  margin: 0 0 5px 0;
}
.box_style .box_style_body
{
  padding: 0;
}
/* css tooltip */
.tooltip_cus
{
  /* position: relative; */
}
.tooltip_data
{
  display: none;
}
.tooltip_cus:hover .tooltip_data
{
  display: inline-block;
  padding: 12px 22px;
  background-color: #283891;
  position: absolute;
  right: 0;
  bottom: 22px;
  border-radius: 3px;
  color: #fff;
}

/* scrollbar_comman */
.scrollbar_style::-webkit-scrollbar{
        border-radius: 10px;
        width: 10px;
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}
.scrollbar_style::-webkit-scrollbar-thumb{
    border-radius: 10px;
    width: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #808080;
}
body::-webkit-scrollbar {
  width: 5px;
}

/* Track */
body::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
body::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* header */
.nav_sec
{
  background-color: var(--blue) !important;
  min-height: auto;
  padding: 0px 0;
  box-shadow: none !important;
  position: relative !important;
}
.nav_inner
{
    display: flex;
  min-height: auto !important;
}
.logo_area
{
    width: 25%;
    display: flex;
    align-items: center;
}
.nav_area
{
    width: 75%;
    display: flex;
    align-items: center;
}
.logo_area img
{
  max-width: 130px;
  width: auto;
}
.nav_area ul{
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav_area ul li{
  padding: 0 4px;
}
.nav_area ul li a
{
  color: #fff;
  text-decoration: none;
  background-color: transparent;
  padding: 17px 16px;
  display: block;
  border-radius: 14px 14px 0 0;
}
.nav_area ul li a.active
{
  background-color: #f4f4f4;
  color: #283891;
}
.nav_area ul li a.active .nav_item_icon img
{
  filter: brightness(1) invert(0);
}
.nav_area ul li a .nav_item_icon
{
  display: inline-block;
  vertical-align: text-bottom;
  padding-right: 5px;
}
.nav_area ul li a .nav_item_icon img
{
  width: 16px;
  filter: brightness(0) invert(1);
}
/* header right */
.header_right {
  display: flex;
  align-items: center;
}
.logged_user
{
  margin-left: 25px;
}
.logged_user .logged_circle
{
  width: 40px;
  height: 40px;
  background-color: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.logged_circle img
{
  width: 100%;
}
.filter_btn_box
{
  display: flex;
  cursor: pointer;
}
/* side filter modal */
.side_filter_head
{
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 18px;
  padding-bottom: 5px;
}
.side_filter_head h3
{
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
}
.side_filter_head .filter_clear_btn
{
  font-size: 12px;
  color: #ffffff;
  /* text-decoration: underline; */
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  /* border: 1px solid #103ca8; */
  padding: 6px 11px;
  display: inline-block;
  border-radius: 3px;
  line-height: 1 !important;
  background-color: #103ca8;
  letter-spacing: 0.5px;
  right: -34px;
  position: relative;
  box-shadow: none;
}
.side_filter_head .filter_clear_btn:hover
{
  background-color: #103ca8;
  box-shadow: none;
}
.side_filter_head .f_close
{
  font-size: 26px;
  position: relative;
  top: -2px;
  cursor: pointer;
}
.filter_form_style
{
  padding: 0 6px;
}
.filter_form_style .MuiFormControl-root
{
  margin-top: 0px;
  margin-bottom: 12px;
}
.filter_form_style .form_control
{
  height: 48px;
  min-height: 48px;
  padding: 0px 0px;
  text-align: left;
  width: 100%;
}
.filter_form_style .rs-picker-toggle
{
  height: 48px;
  min-height: 48px;
  margin-bottom: 12px;
  line-height: 35px;
  border: 1px solid#bab3b3 !important;
}
.filter_form_style .form_control,
.filter_form_style .rs-picker-toggle
{
  outline: none;
  box-shadow: none;
}
.filter_form_style .rs-picker-daterange .rs-picker-toggle.rs-btn .rs-picker-toggle-caret,
.filter_form_style .rs-picker-daterange .rs-picker-toggle.rs-btn .rs-picker-toggle-clean
{
  top: 13px;
}
.form_control .css-1d3z3hw-MuiOutlinedInput-notchedOutline
{
  top: 0;
}
.css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root:hover .MuiOutlinedInput-notchedOutline
{
  border-color: #bab3b3 !important;
}
.filter_apply_btn
{
  width: 100px;
}

.react-daterange-picker
{
  height: 48px;
  margin-bottom: 15px;
}
.react-daterange-picker__wrapper
{
  border-radius: 5px;
  border-color: #bab3b3 !important;

}
.react-daterange-picker__inputGroup__input:focus
{
  outline: none !important;
}
.react-calendar__month-view__weekdays__weekday abbr[title]
{
  text-decoration: none !important;
  cursor: default;
}
.react-calendar__tile--active {
  background: #b1d4f7 !important;
  color: #0a0a0a !important;
}

.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected
{
  background-color: #c3d1f4 !important;
  border-bottom: 1px solid #e7e5e5;
}
.css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root
{
  width: 92%;
  margin: 0 4% !important;
}
.selected_title
{
  font-weight: 700;
  color: #726c6c;
  background-color: transparent !important;
  border-bottom: 1px solid #ebe6e6;
  width: 100%;
  display: block;
  padding: 8px 6px 5px 6px;
}
/*  */
.page_body
{
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 25px;
  padding-right: 25px;
  min-height: calc(100vh - 105px);
}
/* page_title_sec */
.page_title_sec
{
}
.page_title_sec h1
{
  font-size: 28px;
  color: #000;
  margin: 0 0 0px 0;
  font-weight: 700;
  letter-spacing: 0.2px;
  line-height: 1.2;
}
/* == dash_count_sec == */
.dash_count_sec
{
    padding: 0px 0;
}
.dash_count_box_main
{
  margin-bottom: 24px;
  display: flex;
}
.dash_count_box
{
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  border: 1px solid #dedddd;
  padding: 13px 15px;
  position: relative;
  overflow: hidden;
  height: 100%;
  -webkit-box-shadow: 10px 10px 0px 0px #dadce7;
  -moz-box-shadow: 10px 10px 0px 0px #dadce7;
  box-shadow: 10px 10px 0px 0px #dadce7;
  transition-duration: 0.3s;
}
.dash_count_box:hover
{
  -webkit-box-shadow: 7px 7px 0px 0px #c3c5d0;
  -moz-box-shadow: 7px 7px 0px 0px #c3c5d0;
  box-shadow: 7px 7px 0px 0px #c3c5d0;
  transition-duration: 0.3s;
}
.dash_count_box .dash_icon
{
    margin-bottom: 9px;
}
.dash_count_box .dash_icon img {
  width: 78px;
}
.dash_count_box
{
}
.dash_count_box h3
{
  font-size: 26px;
    color: #000000;
    margin: 0 0 5px 0;
    font-weight: 600;
    letter-spacing: 0.6px;
    font-family: 'Poppins', sans-serif;
}
.dash_count_box h5
{
  font-size: 16px;
  color: #000;
  margin: 0 0 0px 0;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}
.round_shape
{
  border-radius: 50%;
  background-image: -moz-linear-gradient( 90deg, rgb(114,136,185) 0%, rgb(134,165,215) 50%, rgb(213,235,245) 100%);
  background-image: -webkit-linear-gradient( 90deg, rgb(114,136,185) 0%, rgb(134,165,215) 50%, rgb(213,235,245) 100%);
  background-image: -ms-linear-gradient( 90deg, rgb(114,136,185) 0%, rgb(134,165,215) 50%, rgb(213,235,245) 100%);
  opacity: 0.09;
  position: absolute;
  right: -40%;
  bottom: -50%;
  width: 190px;
  height: 190px;
  z-index: 1;
}
/* progress bar chart  sec */
.progress_area
{
    min-height: 270px;
    overflow-y: scroll;
    height: 270px;
    padding-right: 15px;
}
.progress_repeat {
  display: flex;
  width: 100%;
  margin-bottom: 15px;
  position: relative;
}
.progress_repeat .progress_name
{
  width: 140px;
}
.progress_repeat .progress_name label{
  font-size: 14px;
}
.progress_repeat .progress
{
  width: 100%;
  border-radius: 20px;
  padding: 3px;
  height: 21px;
}
.progress_repeat .progress .progress-bar
{
  border-radius: 20px;
  font-size: 10px;
  text-align: right;
  padding-right: 34px;
  padding-left: 5px;
}
.bg_green
{
  background-color: #1db904 !important;
}
.bg_light_blue
{
  background-color: #3898f5 !important;
}
/* footer sec */
.footer_sec
{
  background-color: #151515;
  padding: 15px 0;
  text-align: center;
}
.footer_sec p
{
  color: #fff;
  margin: 0;
  font-size: 14px;
}

/* table_style_comman */
.table_style_comman
{

}





/* 
.css-gl260s-MuiDataGrid-columnHeadersInner
{
  width: 100% !important;
}
.css-1e2bxag-MuiDataGrid-root .MuiDataGrid-columnHeaderTitleContainer
{
  
}
.MuiDataGrid-columnHeader
{
  border: 1px solid green;
  flex: 1 0 0%;
    width: auto !important;
    min-width: auto !important;
    max-width: 100% !important;

}
.MuiDataGrid-row .MuiDataGrid-cell,
.MuiDataGrid-cell
{
    flex: 1 0 0%;
    width: auto !important;
    min-width: auto !important;
    max-width: 100% !important;
    border: 1px solid red;
}
.css-yrdy0g-MuiDataGrid-columnHeaderRow,
.MuiDataGrid-row,
.css-1e2bxag-MuiDataGrid-root .MuiDataGrid-row
{
  width: 100% !important;
  
}
#transcription_tbl .MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row .MuiDataGrid-cell:last-child
{
  display: none;
}
#transcription_tbl .css-s1v7zr-MuiDataGrid-virtualScrollerRenderZone
{
  position: relative;
} */

.table_style_comman .MuiDataGrid-columnHeaders
{
  background-color: #dde1f4;
}

.table_style_comman .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-cell--textCenter,
.table_style_comman .MuiDataGrid-columnHeaderTitleContainer
{
  -webkit-justify-content: flex-start !important;
  justify-content: flex-start !important;
}

.table_style_comman .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-columnHeader:focus, 
.table_style_comman .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-cell:focus,
.table_style_comman .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, 
.table_style_comman .css-1e2bxag-MuiDataGrid-root .MuiDataGrid-cell:focus-within
{
  outline: none !important;
}
.table_style_comman .MuiDataGrid-row .MuiDataGrid-cell,
.table_style_comman .MuiDataGrid-cell
{
  font-size: 13px;
}
.table_style_comman .MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row:nth-child(even)
{
  /* background-color: #f8f8f8; */
}
#transcription_tbl
{
  height: 420px;
}
#transcription_tbl .view_trans_btn
{
  border-radius: 50%;
  height: 35px;
  width: 35px;
  display: flex;
  min-width: auto;
  color: #cb1818;
  border: 1px solid var(--blue);
  align-items: center;
  justify-content: center;
  transition-duration: 0.3s;
}
#transcription_tbl .view_trans_btn svg
{
  color: #283891;
  font-size: 19px;
}
#transcription_tbl .view_trans_btn:hover{
  background-color: var(--blue);
  transition-duration: 0.3s;
}
#transcription_tbl .view_trans_btn:hover svg{
  color: #fff;
}
.highlightScore 
{
  padding: 6px 10px;
  background-color: #e5e1e1;
  border-radius: 3px;
  min-width: 73px;
  text-align: center;
}
.highlightScore.goodScore
{
  background-color: #f2feef;
  color: #0c7e03;
}
.highlightScore.avgScore
{
  background-color: #fdf6e8;
  color: #f98802;
}
.highlightScore.badScore
{
  background-color: #f9ebeb;
  color: #f70606;
}
.highlightScore.notFound
{
  background-color: #d4d9fb;
  color: #000000;
}
.highlightScore.found
{
  background-color: #d4d9fb;
  color: #000000;
}
.highlightScore.notFound,
.highlightScore.found
{
  font-weight: 600;
}
/*  */
.trans_modal
{
  
}
.trans_modal {
  z-index: 9999;
}
.modal.trans_modal .modal-dialog
{
  max-width: 100%;
  margin: 0;
}
.t_search
{
  position: relative;
  max-width: 330px;
  width: 100%;
}
.t_search .form-control
{
  padding-right: 40px;
}
.t_search .search_inp
{
  width: 100%;
}
.t_search .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input
{
  padding: 10.5px 14px;
  padding-right: 85px;
  outline: none !important;
}
.t_search .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus
{
  outline: none !important;
  box-shadow: none !important;
}
.MuiInputBase-formControl
{
  outline: none !important;
  box-shadow: none !important;
}
.t_search .search_icon
{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #283891 !important;
  min-width: 32px;
  box-shadow: none !important;
  border-radius: 0 4px 4px 0;
  padding: 1px 10px;
}
.t_search .search_clear
{
  position: absolute;
  right: 49px;
  top: 0;
  height: 100%;
  padding: 0;
  width: auto;
  min-width: 34px;
  color: #8f8c8c;
  background-color: transparent !important;
}
.t_search .search_clear:hover{
  color:#222;
}
.t_search .t_searach_btn
{
  background-color: transparent;
  padding: 0 6px;
  height: 100%;
}


.text_con_repeat
{
  display: flex;
  margin-bottom: 10px;
}
.text_con_repeat .text_con_name
{
  min-width: 90px;
}
.text_con_repeat .text_con_chat
{
  /* padding-left: 30px; */
}
.text_con_repeat .text_con_name h4
{
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 3px 0;
  color: #094a95;
}
.text_con_repeat .text_con_name h5
{
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 3px 0;
  font-style: italic;
}
.text_con_repeat.agent_row .text_con_name h4
{
  color: #eb6d10 !important;
}

/* tooltip */

.css-ja5taz-MuiTooltip-tooltip
{
  background-color: #283891 !important;
  padding: 10px 20px !important;
  color: #fff !important;
}
/* .css-ja5taz-MuiTooltip-tooltip:before
{
  content: "";
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
} */



/* loader style */
.loader_style 
{
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 99999;
  background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}

.audio_payer_sec
{
  margin-top: 10px;
}
.wave_controls {
  border: 1px solid #edeaea;
    margin-top: 20px;
    border-radius: 3px;
    padding: 8px 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f8f8f8;
}
.play_forward_btn
{
  color: #283891;
}
.play_forward_btn .btn_play
{
  
  min-width: 36px;
    padding: 0;
    font-size: 37px;
}
.play_forward_btn .btn_play svg{
  font-size: 33px;
  color: #283891;
}
#transcription_modal .modal-title
{
  color: #000;
  font-size: 17px;
}

.timestamp:hover{
  cursor: pointer;
  text-decoration: underline;
}

.active-text{
  background-color: #d6e6f5;
    color: #000000;
    padding: 8px 10px;
    border-radius: 5px;
}

.table_style_comman .css-iclwpf .MuiDataGrid-cell--textCenter{
  justify-content: flex-start !important;
}
