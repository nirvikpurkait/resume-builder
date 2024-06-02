import { cachedGetUserDetails } from "@/cache/cachedGetUserDetails";
import { getCookie } from "@/utils/cookies/server";
import { nameInitials } from "@/utils/name-initials";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { redirect } from "next/navigation";
import { formatDateWithSuffix } from "@/utils/date";

export async function generatePdf() {
  const userId = getCookie("userId");
  if (!userId) redirect("/");

  const userDetails = await cachedGetUserDetails(userId);

  const imageSrc = userDetails?.profilePicture;
  const username = userDetails?.username;
  const name = userDetails?.name;
  const basicDetails = userDetails?.resumeDetails;
  const careerObjective = userDetails?.resumeDetails?.careerObjective;
  const educationDetails = userDetails?.resumeDetails?.educations;
  const skills = userDetails?.resumeDetails?.skills;
  const projectDetails = userDetails?.resumeDetails?.projects;
  const workExperience = userDetails?.resumeDetails?.workExperiences;

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      fontFamily: "Helvetica",
    },
    image: {
      width: "100%",
      aspectRatio: "1",
      borderRadius: "100%",
      objectFit: "cover",
    },
  });

  console.log(imageSrc);

  const MyPDFDocument = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              flexGrow: 1,
              marginTop: 25,
              marginRight: 25,
              marginBottom: 25,
              marginLeft: 40,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                // border: "1px solid blue",
                // flexBasis: "100%",
              }}
            >
              <ProfilePic />
              <BasicDetails />
            </View>
            <CareerObjective />
            <EducationDetails />
            <Skills />
            <ProjectDetails />
            <WorkExperience />
          </View>
        </Page>
      </Document>
    );
  };

  function WorkExperience() {
    return (
      <View>
        <Heading heading="Work Experience" />
        {workExperience && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: "10px",
              rowGap: "10px",
              // border: "1px solid red",
            }}
          >
            {workExperience.map((work) => (
              <View
                key={work.id}
                style={{
                  width: "100%",
                  maxWidth: "50%",
                }}
              >
                <Text style={{ fontSize: "17px" }}>{work.designation}</Text>
                <Text style={{ fontSize: "10px" }}>
                  {work.companyName}, {work.location}
                </Text>
                <Text style={{ fontSize: "14px" }}>{work.workDescription}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  function ProjectDetails() {
    return (
      <View>
        <Heading heading="Project Details" />
        {projectDetails && (
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{
                  flexBasis: "30%",
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "gray",
                }}
              >
                Project title
              </Text>
              <Text
                style={{
                  flexBasis: "70%",
                  color: "white",
                  textAlign: "center",
                  backgroundColor: "gray",
                }}
              >
                Project description
              </Text>
            </View>
            {projectDetails.map((project) => (
              <View
                key={project.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text
                  style={{
                    flexBasis: "30%",
                    paddingLeft: "4px",
                    borderBottom: "1px solid black",
                    borderRight: "1px solid black",
                  }}
                >
                  {project.projectTitle}
                </Text>
                <Text
                  style={{
                    flexBasis: "70%",
                    paddingLeft: "4px",
                    borderBottom: "1px solid black",
                  }}
                >
                  {project.overview}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  function Skills() {
    return (
      <View>
        <Heading heading="Skills" />
        {skills && (
          <View
            style={{
              fontSize: "14px",
              display: "flex",
              flexDirection: "row",
              gap: "4px",
            }}
          >
            {skills.map((skill) => (
              <View
                key={skill.id}
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  paddingHorizontal: "4px",
                  paddingVertical: "2px",
                  borderRadius: "4px",
                }}
              >
                <Text>{skill.skillName}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  function EducationDetails() {
    return (
      <View style={{ fontSize: "14px" }}>
        <Heading heading="Education Details" />
        {educationDetails && (
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{
                  flexBasis: "8%",
                  backgroundColor: "gray",
                  paddingLeft: "2px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Sl.no
              </Text>
              <Text
                style={{
                  flexBasis: "41%",
                  backgroundColor: "gray",
                  paddingLeft: "2px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Course
              </Text>
              <Text
                style={{
                  flexBasis: "41%",
                  backgroundColor: "gray",
                  paddingLeft: "2px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Institute name
              </Text>
              <Text
                style={{
                  flexBasis: "10%",
                  backgroundColor: "gray",
                  paddingLeft: "2px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Marks
              </Text>
            </View>
            {educationDetails.map((details, index) => (
              <View
                key={details.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Text
                  style={{
                    flexBasis: "8%",
                    borderBottom: "1px solid black",
                    borderRight: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </Text>
                <Text
                  style={{
                    flexBasis: "41%",
                    borderBottom: "1px solid black",
                    borderRight: "1px solid black",
                    paddingLeft: "2px",
                    // borderLeft: "1px solid black",
                  }}
                >
                  {details.course}
                </Text>
                <Text
                  style={{
                    flexBasis: "41%",
                    borderBottom: "1px solid black",
                    paddingLeft: "2px",
                    borderRight: "1px solid black",
                    // borderLeft: "1px solid black",
                  }}
                >
                  {details.instituteName}
                </Text>
                <Text
                  style={{
                    flexBasis: "10%",
                    borderBottom: "1px solid black",
                    textAlign: "center",
                  }}
                >
                  {Number(details.marks)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  function CareerObjective() {
    return (
      <View style={{ marginTop: "0px" }}>
        <Heading heading="Career objective" />
        <Details>
          <Text>{careerObjective && careerObjective}</Text>
        </Details>
      </View>
    );
  }

  function BasicDetails() {
    return (
      <View style={{ fontSize: "12px" }}>
        <View>
          <Text style={{ fontSize: "30px" }}>{name}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            // border: "1px solid red",
            marginTop: "10px",
          }}
        >
          <View
            style={{
              // border: "1px solid lime",
              maxWidth: "50%",
              width: "50%",
              marginBottom: "5px",
              columnGap: "2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={`https://img.icons8.com/ios-glyphs/30/github.png`}
              style={{ width: "16px" }}
            />
            <Text>{basicDetails?.github}</Text>
          </View>
          <View
            style={{
              // border: "1px solid lime",
              maxWidth: "50%",
              width: "50%",
              marginBottom: "5px",
              columnGap: "2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={`https://img.icons8.com/ios-filled/50/new-post.png`}
              style={{ width: "16px" }}
            />
            <Text>{basicDetails?.email}</Text>
          </View>
          <View
            style={{
              // border: "1px solid lime",
              maxWidth: "50%",
              width: "50%",
              marginBottom: "5px",
              columnGap: "2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={`https://img.icons8.com/ios-filled/50/linkedin.png`}
              style={{ width: "16px" }}
            />
            <View
              style={{
                width: "100%",
                // border: "1px solid blue"
              }}
            >
              <Text>{basicDetails?.linkedIn}</Text>
            </View>
          </View>
          <View
            style={{
              // border: "1px solid lime",
              maxWidth: "50%",
              width: "50%",
              marginBottom: "5px",
              columnGap: "2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={`https://img.icons8.com/ios-filled/50/iphone14-pro.png`}
              style={{ width: "16px" }}
            />
            <Text>{basicDetails?.phone}</Text>
          </View>
          <View
            style={{
              // border: "1px solid lime",
              maxWidth: "50%",
              width: "50%",
              marginBottom: "5px",
              columnGap: "2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={`https://img.icons8.com/ios-filled/50/marker.png`}
              style={{ width: "16px" }}
            />
            <Text>{basicDetails?.address}</Text>
          </View>
          <View
            style={{
              // border: "1px solid lime",
              maxWidth: "50%",
              width: "50%",
              marginBottom: "5px",
              columnGap: "2px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={`https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/64/external-calender-time-and-date-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png`}
              style={{ width: "16px" }}
            />
            <Text>
              {formatDateWithSuffix(basicDetails?.dateOfBirth as Date)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function ProfilePic() {
    return (
      <View
        style={{
          // border: "1px solid green",
          width: "130px",
          display: "flex",
        }}
      >
        {imageSrc && <Image src={imageSrc} style={styles.image} />}
        {!imageSrc && username && (
          <View>
            <Text>{nameInitials(username)}</Text>
          </View>
        )}
      </View>
    );
  }

  function Heading({ heading }: { heading: string }) {
    return (
      <Text
        style={{ fontSize: "24px", marginBottom: "2px", marginTop: "10px" }}
      >
        {heading}
      </Text>
    );
  }

  function Details({ children }: { children: any }) {
    return <View style={{ fontSize: "14px" }}>{children}</View>;
  }

  return MyPDFDocument;
}
