(function ($, Main, undefined) {
  var obj = Main;

  var conf = obj.settings = {
    githubAuthButton:    '[data-github-auth]',
    githubRepos:         '#repo-list',
    directoryList:       '#directory-list',
    directoryListItem: '.list__caret',
    shareLinkInput:      '[data-share-link]',
    questionLineNum:     '.question',
    functionScroll:      '[data-function-scroll]',
    questionSubmit:      'input[type="submit"]'
  };

  var handleDirectoryList = obj.handleDirectoryList = function() {
                              $(conf.directoryListItem).each(function() {
                                $(this).has('.active').addClass('open');
                              });
                            };

  var setDimensions       = obj.setDimensions = function() {
                              
                            };

  obj.init                = function(){
                              _initialize();
                              _bindEvents();
                            };

  function _initialize() {
    handleDirectoryList($('dashboard'));
    setDimensions();
  }

  function _bindEvents() {
    // $(window).on('resize', _handleWindowResize);
    // $(window).bind('scroll', _handleWindowScroll);
    $(conf.githubAuthButton).on('click', _authenticateGithub);
    $(conf.directoryListItem).on('click', _openDirectoryDrawer);
    $(conf.shareLinkInput).on('click', _selectAllInInput);
    $(conf.questionLineNum).mouseenter(_lineNumIn).mouseleave(_lineNumOut);
    $(conf.functionScroll).on('click', _handleFunctionScroll);
    $(conf.questionSubmit).on('click', _handleQuestionSubmit);
  }

  function _handleFunctionScroll(e) {
    e.preventDefault();
    var i = $(this).data("functionScroll");

    $('.dashboard').animate({
      scrollTop: 35*(i-1)
    }, 500);
  }

  function _lineNumIn() {
    var i = $(this).data("lineNum");
    $('#code-line-' + i).addClass('highlight');

    var top = $('.dashboard').scrollTop();
    var windowHeight = $(window).height();
    var dest = 35*(i-1);

    if ((dest) < top) {
      $('.dashboard').animate({
        scrollTop: 35*(i-1)
      }, 500);
    }

    if (dest > (top+windowHeight-70)) {
      $('.dashboard').animate({
        scrollTop: (35*(i+1)) - windowHeight + 5
      }, 500);
    }
  }

  function _lineNumOut() {
    var i = $(this).data("lineNum");
    $('#code-line-' + i).removeClass('highlight');
  }

  function _handleWindowResize(e) {
    setDimensions();
  }

  function _handleWindowScroll(e) {
  }

  function _authenticateGithub(e) {
    e.preventDefault();
    $(this).html('Waiting...')
           .prop("disabled", true);

    setTimeout(_showGitRepos, 1000);
  }

  function _showGitRepos() {
    $(conf.githubAuthButton).hide();
    $(conf.githubRepos).show();
  }

  function _openDirectoryDrawer(e) {
    e.preventDefault();
    $(this).toggleClass('open');
  }

  function _selectAllInInput(e) {
    $(this).select();
  }

  function _handleQuestionSubmit(e) {
    e.preventDefault();
    
    var d = $(this).closest('[data-uk-dropdown]');
    UIkit.dropdown(d).hide();
    e.stopPropagation();
  }

  $(document).ready(function() {
    obj.init();
  });

  return obj;

}(jQuery, window.CodeHermes || {}));