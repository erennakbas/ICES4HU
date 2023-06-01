import { useRouter } from "next/router";

import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import ConfigService from "src/services/configService";
import axios from "axios";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from "@material-ui/core";

const configService = ConfigService();
const now = new Date();

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionType, setQuestionType] = useState("multipleChoice");
  const [surveySaved, setSurveySaved] = useState(false);

  const handleQuestionChange = (event) => {
    setCurrentQuestion(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${configService.url}/courses/survey/${id}`);

      // filter response.data.courseList if instructor is not null and setCourseList
      console.log(response);

      console.log(response.data);

      setQuestions(response.data.questions);
    } catch (error) {
      alert("There is no active semester");
      router.push("/");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSurveySubmission = () => {
    alert("Survey submitted successfully!");
    router.push("/");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
        }}
      >
        {questions.map((question) => (
          <div
            key={question.id}
            style={{
              border: "1px solid SlateBlue",
              margin: "5px",
              pardding: "5px 5px",
              borderRadius: "10px",
              display: "block",
            }}
          >
            <p style={{ marginLeft: "5px" }}>
              Question {question.id} {question.question}
            </p>

            {question.type === "multipleChoice" ? (
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ marginLeft: "5px" }}>
                  Select a Choice:
                </FormLabel>
                <RadioGroup
                  aria-label={`answerChoices-${question.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    width: "650px",
                  }}
                >
                  <FormControlLabel
                    value="stronglyDisagree"
                    control={<Radio />}
                    label="Strongly Disagree"
                  />
                  <FormControlLabel value="disagree" control={<Radio />} label="Disagree" />
                  <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
                  <FormControlLabel value="agree" control={<Radio />} label="Agree" />
                  <FormControlLabel
                    value="stronglyAgree"
                    control={<Radio />}
                    label="Strongly Agree"
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              <TextareaAutosize
                minRows={3}
                placeholder="Enter your answer"
                style={{ width: "640px", padding: "5px", margin: "5px 5px" }}
              />
            )}
          </div>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSurveySubmission()}
          style={{
            margin: "4px 4px",
          }}
        >
          Submit Survey
        </Button>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
