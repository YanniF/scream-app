import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

import { Button, TextField, Dialog, DialogContent, DialogTitle, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import MyButton from '../../util/MyButton';
import { postScream, clearErrors } from '../../store/actions/dataActions';

const styles = (theme) => ({
	...theme.properties,
	submitButton: {
		position: 'relative',
		float: 'right',
		marginTop: 10,
	},
	progressSpinner: {
		position: 'absolute',
	},
	closeButton: {
		position: 'absolute',
		left: '91%',
		top: '6%',
	},
});

class PostScream extends Component {
	state = {
		open: false,
		body: '',
		errors: {},
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors,
			});
		}
		if (!nextProps.UI.errors && !nextProps.UI.loading) {
			this.setState({ body: '', open: false, errors: {} });
		}
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.clearErrors();
		this.setState({ open: false, errors: {} });
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.postScream({ body: this.state.body });
	};

	render() {
		const { errors } = this.state;
		const { classes, UI: { loading } } = this.props;

		return (
			<Fragment>
				<MyButton onClick={this.handleOpen} tip="Post a Scream!">
					<AddIcon />
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</MyButton>
					<DialogTitle>Post a new scream</DialogTitle>
					<DialogContent>
						<form onSubmit={this.handleSubmit}>
							<TextField
								name="body"
								type="text"
								label="SCREAM!"
								multiline
								rows="3"
								placeholder="Scream at your fellow apes"
								error={errors.body}
								helperText={errors.body}
								className={classes.textField}
								onChange={this.handleChange}
								fullWidth
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.submitButton}
								disabled={loading}
							>
								Submit
								{loading && <CircularProgress size={30} className={classes.progressSpinner} />}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PostScream.propTypes = {
	postScream: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = ({ ui }) => ({
	UI: ui,
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));
