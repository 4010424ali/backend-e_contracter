import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IconButton, Tooltip } from '@material-ui/core';
import { Spellcheck } from '@material-ui/icons';

import AddProject from './AddProject';

const EditCustomer = (props) => {
  const [addOpen, setAddOpen] = useState(false);
  const params = useParams();
  const history = useHistory();

  const handleCloseAdd = () => {
    history.push({ pathname: `/customer/${params.id}` });
    setAddOpen(false);
  };

  const handleClickAddOpen = () => {
    setAddOpen(true);
    window.history.pushState('', '', '/edit/customer');
  };
  return (
    <>
      <IconButton onClick={handleClickAddOpen}>
        <Tooltip title="edit customer">
          <Spellcheck color="action" />
        </Tooltip>
      </IconButton>
      <AddProject
        handleCloseAdd={handleCloseAdd}
        open={addOpen}
        setOpen={setAddOpen}
        customer={props.data}
      />
    </>
  );
};

export default EditCustomer;
