import React from "react";

// UI
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = [
  {
    q: `Is it an Online Class?`,
    a: `Yes, the classes at the Umonics Method are online. We’ll be able to serve clients in the safety and comfort of their own homes!`,
  },
  {
    q: `Do you offer a free trial class?`,
    a: `Yes, we have trial classes on Wednesday and Thursday. Completely free of charge, to allow the parents and students to experience the whole process.`,
  },
  {
    q: `May I know more details about the classes?`,
    a: `The classes at The Umonics Method go term by term, and each term includes 12 lessons. One term runs for three months. Classes are held once a week, with the available schedules falling on either Saturdays or Sundays.
    The duration of the class runs from 30 to 45 minutes each lesson. The maximum number of participants per class is eight students.`,
  },
  {
    q: `How long would each session be?`,
    a: `The duration of the class runs from 30 to 45 minutes each lesson.`,
  },
  {
    q: `How do we know if my child is progressing?`,
    a: `Students will each have unique login details to the E-Learning Management System Portal. Mini-series videos and flashcards will be updated regularly for home revision purposes. We will give Progress report cards weekly to help the parents keep track of their child’s assessment during the lessons.`,
  },
  {
    q: `Do I need to prepare any learning materials?`,
    a: `Each student is required to have a computer/tablet and a stable internet connection. Students will be informed ahead of time if there are required materials that are not listed above.`,
  },
  {
    q: `When has payment needed to be made?`,
    a: `Full payment for the whole term is to be made before the first session.`,
  },
  {
    q: `My child has a short attention span. Will group trial class do work?`,
    a: `The free trial being offered is similar to the actual classes being conducted. The Umonics Method does not intend to provide a distinct atmosphere that might cloud or misrepresent the students’ response to the online environment.`,
  },
  {
    q: `Are the teachers and teaching will be from Singapore?`,
    a: `Our teachers are based internationally. We have Singapore teachers as well as teachers from the Philippines. The head trainer is based in Singapore and oversees the curriculum delivery.`,
  },
  {
    q: `Are the classes paid monthly?`,
    a: `Classes in the Umonics Method go term by term, consisting of 12 lessons per term. Thus, full payment for the whole term is required before the first session begins.`,
  },
  {
    q: `Do you have a physical Centre in Singapore?`,
    a: `The Umonics Method did have a physical centre. However, due to the COVID-19 pandemic, classes are currently being held online to ensure the safety of the students.`,
  },
  {
    q: `Is it similar to Shichida and Heguru?`,
    a: `The Umonics Method teaches memory techniques and strategies, while Shichida and Heguru are for brain stimulation.`,
  },
  {
    q: `Will the course material be the same for all ages?`,
    a: `The course material and duration of lessons are tailored to the specific age of the student. This ensures that the lessons fit the student’s learning capacity at particular ages.`,
  },
];

const FAQPage = () => {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-main-500 flex flex-col items-center py-10 relative gap-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-6xl font-bold text-white">FAQs</div>
        <p className="max-w-lg text-center text-white">
          Find answers to commonly asked questions about our subscription terms,
          cancellation policies, and payment options.
        </p>
      </div>
      <div className="flex-1 w-full max-w-2xl text-white">
        <Accordion type="single" collapsible className="w-full">
          {FAQs.map((f, i) => {
            return (
              <AccordionItem value={`item-${i + 1}`}>
                <AccordionTrigger className="font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQPage;
