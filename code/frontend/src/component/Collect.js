import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    board: {
        height: 1,
        border: 0,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


/*
* 需要传入的props
* props.status : 用户的收藏状态 （如 "在看"）
* props.comment : 用户对条目的评论 (一段用户在收藏时写下的评论，可能需要字数限制)
*/
class Collect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded : false
        };

        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick() {
        this.setState({expanded : !this.state.expanded});
    }

    render() {
        return(
            <Card className={useStyles.card}>
                <CardHeader
                    title={"收藏盒"}
                    subheader={"我" + this.props.status + "这部作品"}
                />
                <hr className={useStyles.board} color="#C7C7C7"/>
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        我的评论
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.comment}
                    </Typography>
                </CardContent>
                <hr className={useStyles.board} color="#C7C7C7"/>
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary" component="p">
                        我的完成度
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(useStyles.expand, {
                            [useStyles.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                            minutes.
                        </Typography>
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        <Typography paragraph>
                            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                            again without stirring, until mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                        </Typography>
                        <Typography>
                            Set aside off of the heat to let rest for 10 minutes, and then serve.
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }

}

export default Collect;