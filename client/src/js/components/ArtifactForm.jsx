import React from "react";
import useForm from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, CardActionArea, CardActions } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Card, CardContent } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { openArtifactForm, artifactSwitch } from "../actions/index";
import { uploadImage, submitArtifactForm } from "../actions/artifactRequests";
import uuid from "uuid";

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0.5)
  },
  cardContent: {
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 28,
    paddingLeft: 28,
    "&:last-child": {
      paddingBottom: 6
    }
  },
  cardMedia: {
    height: '100%',
    width: '100%'
  },
  cardText: {
    margin: theme.spacing(1, 0),
  },
  cardTags: {
    margin: theme.spacing(.5, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.25)
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const ArtifactForm = () => {

  const classes = useStyles();
  const artifact = useSelector(store => store.focusView.artifactFormView.artifact)
  const dispatch = useDispatch();
  const pictureSrc = useSelector(store => store.focusView.artifactImageUpload)

  const fillArtifact = {
    title:   artifact.title  ? artifact.title  : "",
    desc:    artifact.desc   ? artifact.desc   : "",
    text:    artifact.text   ? artifact.text   : "",
    date:    artifact.date   ? artifact.date   : "",
    origin:  artifact.origin ? artifact.origin : "",
    tags:    artifact.tags   ? artifact.tags   : "",
    src:     pictureSrc,
    id:      artifact.id     ? artifact.id     : uuid.v4(),
  }

  const defaultImage = "https://www.spiritdental.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png"

  const { register, handleSubmit } = useForm({
    defaultValues: fillArtifact
  });

  const onSubmit = (data, e) =>  {
    dispatch(submitArtifactForm(data));
    e.target.reset();
    dispatch(openArtifactForm(false))
    dispatch(artifactSwitch(data))
    }

  return (
    <Grid container justify="center" className={classes.contained}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          readOnly 
          className={classes.input} 
          ref={register({ required: true })} 
          name="src" 
          value={pictureSrc ? pictureSrc : defaultImage} 
        />
        <input 
          readOnly 
          className={classes.input} 
          ref={register({ required: true })} 
          name="id" 
          value={artifact.id ? artifact.id : uuid.v4()}
        />
          <CardActionArea>
            <CardMedia
              component='img'
              className={classes.cardMedia}
              image={pictureSrc ? pictureSrc : defaultImage}
              alt={pictureSrc ? pictureSrc : defaultImage}
              src={pictureSrc ? pictureSrc : defaultImage}
            />
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardText}>
              <Grid container justify="space-between">
                <Grid item >
                  <TextField
                    name="title"
                    label="title"
                    inputRef={register({ required: true })}
                    placeholder="Grandma's Teeth"
                    value={fillArtifact.title}
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="row-reverse" justify="flex-end">
                    <Grid item>
                      <label htmlFor="contained-button-file">
                        <input
                          accept="image/*"
                          name="imageUpload"
                          className={classes.input}
                          id="contained-button-file"
                          type="file"
                          onChange={(e) => dispatch(uploadImage(e))} />
                        <Button variant="contained" component="span" className={classes.button}>
                          Upload
                          </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="space-between" >
                  <Grid item>
                    <TextField
                      name="date"
                      label="date"
                      inputRef={register({ required: true })}
                      placeholder="3/9/1997"
                      value={fillArtifact.date}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="origin"
                      label="origin"
                      inputRef={register({ required: true })}
                      placeholder="e.g. United Kingdom"
                      value={fillArtifact.origin}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                  <TextField
                    name="tags"
                    label="tags"
                    inputRef={register}
                    placeholder="Antique, Family, Old ..."
                    value={fillArtifact.tags}
                    fullWidth
                  />
              </Grid>
              <Grid item>
                <TextField
                  name="desc"
                  label="summary"
                  inputRef={register({ required: true })}
                  placeholder="A short summary"
                  rows="2"
                  margin="normal"
                  variant="outlined"
                  value={fillArtifact.desc}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  rows="6"
                  variant="outlined"
                  margin="normal"
                  multiline
                  fullWidth
                  name="text"
                  label="text"
                  inputRef={register}
                  value={fillArtifact.text}
                  palceholder="A detailed description "
                />
              </Grid>
              <Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions >
            <Grid container direction="row-reverse">
              <Grid item>
              <input name="submit" type="submit" className={classes.input}  />
                <Button variant="contained" color="primary" size="small" className={classes.button} type="submit" >
                  <SaveIcon />
                  Save
                  </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" size="small" name="cancel" className={classes.button} onClick={() => dispatch(openArtifactForm(false))}>
                  <CancelIcon />
                  Cancel
    </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </Grid>
  )
}



export default ArtifactForm;