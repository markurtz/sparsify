import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LoaderLayout from "../../../components/loader-layout";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  getProjectsThunk,
  selectProjectsState,
} from "../../../store/projects-slice";
import makeStyles  from "./sidenav-styles";
import ScrollerLayout from "../../../components/scroller-layout";
import { List, ListItem, Typography } from "@material-ui/core";

function HomeSideNav() {
  const useStyles = makeStyles();
  const classes = useStyles();

  const dispatch = useDispatch();
  const projectsState = useSelector(selectProjectsState);

  // make a request each time component loads to make sure projects are always up to date
  useEffect(() => {
    dispatch(getProjectsThunk());
  }, [dispatch]);

  return (
    <ScrollerLayout spacingHoriz={0} spacingVert={1}>
      <LoaderLayout error={projectsState.error} status={projectsState.status}>
        <List className={classes.listRoot}>
          {projectsState.val.map((project) => (
            <ListItem button key={project.project_id}>
              <Link
                to={`/projects/${project.project_id}`}
                className={classes.projectCard}
              >
                <Typography color="textPrimary" variant="body1">{project.name}</Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  {moment(project.modified).fromNow()}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </LoaderLayout>
    </ScrollerLayout>
  );
}

export default HomeSideNav;
