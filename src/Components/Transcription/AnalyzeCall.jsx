import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const AnalyzeCall = () => {
  return (
    <div className="modal fade trans_modal" id="transcription_modal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Transcription Agent name Here..</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            {/* Modal body */}
            <div className="modal-body">
            <section className='graph_sec comman_top'>
              <div className="row">
                  <div className="col-lg-12 box_style_main">
                      <div className="box_style">
                          <div className="box_style_body">
                            <div className="wavesuffer_player">
                              audio player space
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-8 box_style_main">
                      <div className="box_style">
                        <div className="box_style_head">
                          <h2>Transcript</h2>
                          <div className="box_title_right">
                            <div className='t_search'>
                              <input type="text" className="form-control" placeholder='Search..' />
                              <div className='search_icon'>
                                <button className="t_searach_btn"><SearchIcon /></button>
                              </div>
                            </div>
                          </div>
                      </div>
                          <div className="box_style_body">
                              <div className='text_translate_area'>
                                <div className='text_con_repeat'>
                                  <div className='text_con_name'>
                                    <h4>Customer</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Hello.</div>
                                </div>
                                <div className='text_con_repeat agent_row'>
                                  <div className='text_con_name'>
                                    <h4>Agent</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Welcome, Mr. (customer name), how are you today?</div>
                                </div>
                                <div className='text_con_repeat'>
                                  <div className='text_con_name'>
                                    <h4>Customer</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Hello.</div>
                                </div>
                                <div className='text_con_repeat agent_row'>
                                  <div className='text_con_name'>
                                    <h4>Agent</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Welcome, Mr. (customer name), how are you today?</div>
                                </div>
                                <div className='text_con_repeat'>
                                  <div className='text_con_name'>
                                    <h4>Customer</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Hello.</div>
                                </div>
                                <div className='text_con_repeat agent_row'>
                                  <div className='text_con_name'>
                                    <h4>Agent</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Welcome, Mr. (customer name), how are you today?</div>
                                </div>
                                <div className='text_con_repeat'>
                                  <div className='text_con_name'>
                                    <h4>Customer</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Hello.</div>
                                </div>
                                <div className='text_con_repeat agent_row'>
                                  <div className='text_con_name'>
                                    <h4>Agent</h4>
                                    <h5>00:00</h5>
                                  </div>
                                  <div className='text_con_chat'>Welcome, Mr. (customer name), how are you today?</div>
                                </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-lg-4 box_style_main">
                      <div className="box_style">
                          <div className="box_style_body">
                              score space
                          </div>
                      </div>
                  </div>
              </div>
            </section>
            </div>
            {/* Modal footer */}
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AnalyzeCall