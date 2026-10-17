import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: "yashpote65@gmail.com",
        pass: "ztnbfsusnakizisp"
    }

});

export const sendReminderEmail = async (
    email,
    title,
    meetingCode,
    date,
    time
) => {

    await transporter.sendMail({

        from: "yashpote65@gmail.com",

        to: email,

        subject: "Meeting Reminder",

        html: `
            <h2>${title}</h2>

            <p>
                Your meeting starts soon.
            </p>

            <p>
                Meeting Code:
                <b>${meetingCode}</b>
            </p>

            <p>
                Date:
                ${date}
            </p>

            <p>
                Time:
                ${time}
            </p>
        `
    });

};
export const sendSummaryEmail =
async (
    email,
    meetingCode,
    notes,
    summary
) => {

    await transporter.sendMail({

        from:
        "yashpote65@gmail.com",

        to: email,

        subject:
        `Meeting Summary - ${meetingCode}`,

        html: `

        <h2>
            Meeting Summary
        </h2>

        <p>
            Meeting Code:
            <b>${meetingCode}</b>
        </p>

        <h3>
            Notes
        </h3>

        <p>
            ${notes}
        </p>

        <h3>
            Summary
        </h3>

        <p>
            ${summary}
        </p>

        `
    });

};