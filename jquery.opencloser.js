;(function($) {
	$.fn.opencloser = function(options) {
		// build main options before element iteration
		var opts = $.extend({}, $.fn.opencloser.defaults, options);
		opts.debug && debug(this);
		// iterate and reformat each matched element
		var heights = {};
		return this.each(function() {
			var $this = $(this);
			var id = $this.attr('id');
			var $link = opts.$target || $('#' + id + opts.link.surfix);
			var defaultHeight = heights[id] = $this.height();
			var _minHeight = (function(){
				var result = $this.height(opts.minHeight).height();
				$this.height(defaultHeight);
				return result;
			})();
			if (!$link.length) {
				return;
			}
			$link.click(function(){
				if ($link.text() == opts.link.closer) {
					// close
					$this.animate({height: opts.minHeight});
					$link.text(opts.link.opener);
				} else {
					// open
					$this.animate({height: heights[$this.attr('id')] + 'px'});
					$link.text(opts.link.closer);
				}
			});
			if (defaultHeight < _minHeight) {
				opts.minHeight = defaultHeight;
			} else if (opts.closeByDefault) {
				$this.height(opts.minHeight);
				$link.show();
			}
		});
	};
	// private function for debugging
	function debug($obj) {
		if (window.console && window.console.log) {
			window.console.log('opencloser selection count: ' + $obj.size());
		}
	};
	// define and expose our format function
	$.fn.opencloser.methodname = function() {
	};
	// plugin defaults
	$.fn.opencloser.defaults = {
		link: {
			surfix: '-opencloser',
			opener: 'もっと見る',
			closer: 'もとに戻す'
		},
		$target: '',
		closeByDefault: true,
		minHeight: '3em',
		debug: 0
	};
})(jQuery);
