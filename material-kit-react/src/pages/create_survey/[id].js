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

  const handleAddQuestion = () => {
    if (currentQuestion.trim() !== "") {
      const newQuestion = {
        id: questions.length + 1,
        question: currentQuestion,
        type: questionType,
      };

      setQuestions([...questions, newQuestion]);
      setCurrentQuestion("");
    }
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter((question) => question.id !== questionId);
    setQuestions(updatedQuestions);
  };

  const handleSurveySubmission = () => {
    // Anketteki soruları JSON formatında hazırla
    const surveyData = {
      Id: id,
      questions: questions.map((question) => ({
        Id: question.id,
        question: question.question,
        type: question.type,
      })),
    };
    console.log(surveyData);
    // Axios ile backend'e gönder
    axios
      .post(`${configService.url}/courses/survey/${id}`, surveyData)
      .then((response) => {
        // İşlem başarılı olduğunda yapılacaklar
        alert("Survey submitted successfully!");
      })
      .catch((error) => {
        // Hata durumunda yapılacaklar
        console.error("An error occurred while submitting the survey:", error);
      });
  };

  return (
    <div>
      {!surveySaved && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Select a Question Type:</FormLabel>
            <RadioGroup
              aria-label="questionType"
              name="questionType"
              value={questionType}
              onChange={handleQuestionTypeChange}
            >
              <FormControlLabel
                value="multipleChoice"
                control={<Radio />}
                label="Multiple Choice"
              />
              <FormControlLabel value="openEnded" control={<Radio />} label="Open-Ended" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Question"
            value={currentQuestion}
            onChange={handleQuestionChange}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            style={{
              width: "650px",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            style={{
              margin: "8px 4px",
            }}
          >
            Add Question
          </Button>
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
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleDeleteQuestion(question.id)}
                sx={{ marginLeft: "0.5rem" }}
              >
                Delete
              </Button>
              <p style={{ marginLeft: "5px" }}>{question.question}</p>

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
      )}

      {surveySaved && <p>Survey saved. Thank you!</p>}
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
