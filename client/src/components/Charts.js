import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

import AddItem from './AddItem';

const Charts = (props) => {
  const [categories, setcCategories] = useState([]);
  const [deta, setData] = useState([]);
  const progress = useSelector((state) => state.progress.progress);


  let dateArray = [];
  let categoriesArray = [];
  useEffect(() => {
    if (props.data !== undefined) {
      // eslint-disable-next-line
      props.data.map((item) => {
        dateArray.push(item.completePercentage);
        categoriesArray.push(item.taskname);
      });

      setData(dateArray);
      setcCategories(categoriesArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <div className="container">
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <div
              style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                margin: '1rem 0',
              }}
            >
              <AddItem id={props.id} />
              <Chart
                options={{
                  chart: {
                    id: 'basic-bar',
                  },
                  xaxis: {
                    categories: categories,
                  },
                }}
                series={[
                  {
                    name: 'progress',
                    data: deta,
                  },
                ]}
                type="bar"
                width="700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
