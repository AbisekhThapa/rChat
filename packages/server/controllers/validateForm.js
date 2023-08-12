const { formSchema } = require("@rchat/common")

const validateForm = async (req, res, next) => {
    const formData = req.body;
    await formSchema.validate(formData).catch(err => {
        res.status(422).send()
        console.log(err.errors);
    }).then(valid => {
        if (valid) {
            // console.log(formData)
            next()
        } else {
            res.status(422).send()
        }
    })
}

module.exports = validateForm;