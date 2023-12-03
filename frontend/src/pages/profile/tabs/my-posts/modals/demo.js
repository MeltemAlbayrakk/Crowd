import { useState, useEffect } from "react";
import Table from "../../../../../components/layout/table/table";
import api from "../../../../../services/api";

export function CrowdIsDetay() {
  const [offer, setOffer] = useState('');
  const [job, setJob] = useState({});

  useEffect(() => {
    async function get(id) {
      const data = await api.job.get(id);
      setJob(data.data);
    }
    get();
  }, []);
}

export default function DetailBox(props) {
  const {
    detail,
    detailBoxVisibility,
    setDetailBoxVisibility,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    title,
    setTitle,
    category,
    setCategory,
  } = props;

  const appliedMyPostDetailsHeadlines = [
    "Title",
    "Category",
    "FirstName",
    "LastName",
  ];

  const detailRow = (event) => {
    return <button onClick={() => setDetailBoxVisibility(true)}>Detail</button>;
  };

  const [myPostDetail, setMyPostDetail] = useState([
    {
      title: "",
      category: "",
      firstName: "",
      lastName: "",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      const resp = await api.job.get("company");

      const data = resp.map((item) => ({
        title: item.title,
        category: item.category,
        firstName: item.firstName,
        lastName: item.lastName,
      }));

      setMyPostDetail(data);
    };

    getData();
  }, []);


  const selectedJobDetailTitle = title;


  const filteredMyPostDetail = myPostDetail.filter(
    (item) => item.title === selectedJobDetailTitle
  
  );
  console.log("Filtered Data: ", filteredMyPostDetail);
  return (
    <div
      className={
        detailBoxVisibility ? "modal detailBox active" : "detailBox modal"
      }
      id="detailBox"
    >
      <div class="wrapper">
        <div class="content">
          <div class="container-profile">
            <div class="profile__right">
              <div class="container">
                <div class="content-profile"></div>
                <div className="my__posts">
                  
                  {filteredMyPostDetail.map((item) => (
                    <div key={item.title}>
                    

                      <div className="title">{item.title}</div>
                      <a
                        className="close"
                        onClick={() => {
                          setDetailBoxVisibility(false);
                        }}
                      >
                        X
                      </a>
                      <Table
                        headline={appliedMyPostDetailsHeadlines}
                        data={[item]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
