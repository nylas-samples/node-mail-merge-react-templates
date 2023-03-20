import {
 Body,
 Button,
 Container,
 Head,
 Heading,
 Html,
 Link,
 Section,
 Tailwind,
 Text,
} from '@react-email/components'; 
import * as React from 'react';

export const BookAppointmentReminder = ({
 username = 'username',
 teamName = 'Insert Service Provider',
 inviteLink = 'https://schedule.nylas.com/',
 service = 'service 1',
 companyName = 'company name 1',
 preferredDay = 'preferredDay'
}) => {
 return (
   <Html>
     <Head />
     <Tailwind>
       <Body className="bg-white my-auto mx-auto font-sans">
         <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mb-[8px] p-[20px] w-[465px]">
           <Heading className="text-black text-[24px] font-normal text-center p-0 my-0px mx-0">
             Book your next <strong> {service} appointment</strong> with <strong>{teamName}</strong>.
           </Heading>
           <Text className="text-black text-[14px] leading-[24px]">
             Hello {username},
           </Text>
           <Text className="text-black text-[14px] leading-[24px]">
             <strong>{teamName} </strong> 
              has invited you to the book your next appointment for <strong>{service}</strong> at{' '}
             <strong>{companyName}</strong>.
           </Text>
           <Section>
             <Text className="text-black text-[14px] leading-[24px]">We have your preferred day available: <strong>{preferredDay}</strong></Text>
           </Section>
           <Section className="text-center mt-[4px] mb-[4px]">
             <Button
               pX={20}
               pY={12}
               className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
               href={`${inviteLink}${teamName}`}
             >
               Book Appointment
             </Button>
           </Section>
           <Text className="text-black text-[14px] leading-[24px]">
             or copy and paste this URL into your browser:{' '}
             <Link
               href={`${inviteLink}${teamName}`}
               className="text-blue-600 no-underline"
             >
               {`${inviteLink}${teamName}`}
             </Link>
           </Text>
         </Container>
       </Body>
     </Tailwind>
   </Html>
 );
};

export default BookAppointmentReminder;