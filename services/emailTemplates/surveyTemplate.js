if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

module.exports = (survey) => {
  return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your input!</h3>
					<p>Please answer the following question:</p>
					<p>${survey.body}</p>
					<div style="display: inline;">
						<a href="${process.env.REDIRECT_DOMAIN}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div style="display: inline; margin-left: 30px;">
						<a href="${process.env.REDIRECT_DOMAIN}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
