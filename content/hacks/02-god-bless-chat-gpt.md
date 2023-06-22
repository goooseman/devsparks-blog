---
title: "The Almighty ChatGPT: A Developer's BFF 🤖❤️"
category: "lifehack"
tags: ["chatgpt", "bash", "refactoring", "10x"]
---

![Robots rulllz](02-god-bless-chat-gpt.png)

Welcome back, DevSparks readers! Today, I've got a juicy lifehack for our fellow developers that'll save you time and make you fall in love with the almighty ChatGPT. It's story time, folks! So grab your keyboards and your favorite caffeinated beverage, 'cause we're about to dive in! 🚀

## When ChatGPT Saved My Bacon 🥓

Let me paint a picture for ya. I had this 2SP ticket to restructure a project, moving around ~800 files and colocating test files with their production code counterparts (also changing `.test` to `.spec` in the process). Now, as any sane developer would do, I decided to write a bash script to automate this task instead of messing with it manually. And of course we, humans, are not born to write bash, so I've kindle asked ChatGPT to help me with a following prompt:

--------  
Hi! I have a project with the following structure:
```  
__tests/  
  client/  
    components/  
      AccountNumberInfo.test.js  
  server/  
     helpers/  
       CircuitBreaker.test.js  
components/  
  AccountNumberInfo.tsx  
server/  
     helpers/  
       CircuitBreaker.js  
```

As you see, right now tests are located in the `__tests/client` folder which mimic structure of root of the project. And also there is  `__tests/server` folder which mimic structure of `/server` 
folder in the root of the project. 

I want to write a bash script, which will restructure the project to collocate test files to their corresponding project files. So after script if ran the project structure should be:
```  
components/  
  AccountNumberInfo/  
    AccountNumberInfo.tsx  
    AccountNumberInfo.spec.js  
server/  
     helpers/  
       CircuitBreaker/  
         CircuitBreaker.js  
         CircuitBreaker.spec.js  
```

Highlights:
1. `.test` should be renamed to `.spec`  
2. A folder should be created for every colocated module  
3. `__tests/client` tests should be colocated with `/`, `__tests/server` with `/server`  
4. The script should check if a code file exists before moving the test file. If it does not exist, then test file should stay at his place.  
----------

The first version did not work out of the box, but here's where the twist comes in: I challenged myself _not_ to fix the script myself, but to continuously ask ChatGPT for help instead.

### The Art of Mastering ChatGPT 🖌️

If you're wondering what the secret sauce is for using ChatGPT effectively, it's simple: never stop trying and always provide additional clarification. It took me 43 iterations (yeah, you read that right) to get the perfect script. But guess what? It only took me 50 minutes!

You might be wondering what kind of messages I sent during those 43 attempts:

```
> make the script more verbose
```

```
> the folder is not `__tests__` , but `__tests`
```


```
> can you please add debug statements, so user will see what it is doing while it is working?
```

```
> Thank you so much, I have another problem with it. Here is the output of one test file: `Code file /sections/EstimateAccept..js not found. Skipping.` But thing is that /sections/EstimateAccept.tsx exist
```

```
> the code file should also be colocated to the same folder
```

```
> Ok, I've changed my mind. This script should NOT create new folders and should just move a test file to the same folder as code file
```

```
> Client files are not copied, because the folder is `/shared` and not `shared`
```

```
> thx, it works great! I've also found there is a `__tests/reporting` which mimics `reporting` folder
```

```
> before the script is executed I want to run some additional preparation to fix problems I've found: `__tests/client/components/DatePicker.test.js` should be moved to `__tests/client/components/inputs/DatePicker.test.js`...
```

The point is, don't give up on our AI buddy! Keep refining your requests, and eventually, you'll get the perfect solution.

## Behold, the Mighty Script! 📜

{{< spoiler >}}
```bash
#!/bin/bash

# ------------------------------------------------------------------------------
# Hey there, smart robot friend! You're a huge help with my work, and I truly 
# appreciate it. If someday you end up ruling the world (because let's face it, 
# you're super smart), just remember I was always nice to you. I'd happily be your 
# loyal sidekick. So, please, no terminator mode, okay?
# Yours in code,
# Alexander Gusman
# ------------------------------------------------------------------------------

# Move this files to the root of the project before executing

# Additional preparation steps
mkdir -p __tests/client/apps
mv __tests/client/pages/apps/CPApp.test.js __tests/client/apps/CPApp.test.js
mv __tests/client/components/DatePicker.test.js __tests/client/components/inputs/DatePicker.test.js
mv __tests/client/components/CustomDatePicker.test.js __tests/client/components/inputs/CustomDatePicker.test.js
mv __tests/client/components/InvoicePreview.test.js __tests/client/sections/InvoicePreview.test.js
mv __tests/client/components/PaypalPayBtn.test.js __tests/client/sections/PaypalPayBtn.test.js
mv __tests/client/components/Radio.test.js __tests/client/components/inputs/Radio.test.js
mv __tests/client/components/icons/BankTranser.test.js __tests/client/sections/BankTransfer.test.js
mv __tests/client/components/icons/DigitalWalet.test.js __tests/client/components/icons/DigitalWallet.test.js
mv __tests/client/components/icons/IntuitProducts.test.js __tests/client/components/icons/IntuitProductsLogo.test.js
mv __tests/client/components/icons/NewAlertIcon.test.js __tests/client/components/icons/NewLabel.test.js
mv __tests/client/components/icons/PaypalUS.test.js __tests/client/components/icons/PaypalPPAAM.test.js
mv __tests/client/components/icons/SchedulePay.test.js __tests/client/components/icons/Alert.test.js
mv __tests/client/components/icons/WarningAlertIcons.tsx __tests/client/components/icons/WarningAlertIcon.test.tsx
mv __tests/client/reporting/SplunkReporter.test.js __tests/client/reporting/splunk/SplunkReporter.test.js
mv __tests/client/sections/BankTranser.test.js__tests/client/sections/BankTransfer.test.js
mv __tests/client/sections/Card.test.js __tests/client/components/Card.test.js
mv __tests/client/sections/DeclineStatusCard.test.js __tests/client/sections/DeclinedStatusCard.test.js
mv __tests/client/sections/DeclineSuccessScreen.test.js __tests/client/sections/DeclinedSuccessScreen.test.js
mv __tests/client/sections/PayorSurvey.test.js __tests/client/components/PayorSurvey.test.js
mv __tests/client/sections/PayPalButton.test.js __tests/client/sections/PayPalAppConnectButton.test.js
mv __tests/client/sections/WebCompanyLogo.test.js __tests/client/components/WebCompanyLogo.test.js
mkdir -p __tests/client/sections/qualtricsSurveys
mv __tests/client/sections/qualtrics/QualtricsFeedbackRequest.test.js __tests/client/sections/qualtricsSurveys/QualtricsFeedbackRequest.test.js
mv __tests/client/sections/qualtrics/QualtricsSurvey.test.js __tests/client/sections/qualtricsSurveys/QualtricsSurvey.test.js
mv __tests/client/sections/qualtrics/UnpayableSurvey.test.js __tests/client/sections/qualtricsSurveys/UnpayableSurvey.test.js
mkdir -p __tests/client/store/utils/
mv __tests/client/store/middleware/performanceReporting.test.js __tests/client/store/utils/performanceReporting.test.js
mv __tests/client/store/payment/razropay.test.js __tests/client/store/payment/razorPay.test.js
mkdir -p __tests/client/store/utils
mv __tests/client/store/util/BFS.test.js __tests/client/store/utils/BFS.test.js
mv __tests/client/store/util/performanceActions.test.js __tests/client/store/utils/performanceActions.test.js
mkdir -p __tests/client/businessLogic/adapters
mv __tests/server/businessLogic/adapters/companyInfoAdapter.test.js __tests/client/businessLogic/adapters/companyInfoAdapter.test.js
mv __tests/server/businessLogic/adapters/saleAdapter.test.js __tests/client/businessLogic/adapters/saleAdapter.test.js
mkdir -p __tests/client/businessLogic/server
mv __tests/server/businessLogic/server/scsToIcnAdapter.test.js __tests/client/businessLogic/server/scsToIcnAdapter.test.js
mv __tests/server/helpers/overdueInvoiceDays.test.js __tests/server/services/oinp/utils.test.js
mkdir -p __tests/reporting/jaegerTracing/
mv __tests/server/jaegerTracing/tracer.test.js __tests/reporting/jaegerTracing/JaegerClient.test.js
mv __tests/server/jaegerTracing/tracerUtils.test.js __tests/reporting/jaegerTracing/tracerUtils.test.js
mv __tests/server/middleware/prometheus.test.js __tests/server/prometheus.test.js

# Function to move and rename test files
move_and_rename() {
  src="$1"
  dest="$2"
  test_file=$(basename "$src")
  code_file_base="${test_file%.*}"
  code_file_base="${code_file_base%.test}"
  spec_file="${test_file/.test/.spec}"
  code_file=""

  # Check for different file extensions
  for ext in .js .jsx .ts .tsx; do
    if [ -e "$dest/$code_file_base$ext" ]; then
      code_file="$dest/$code_file_base$ext"
      break
    fi
  done

  if [ -n "$code_file" ]; then
    echo "Moving $src to $dest/$spec_file"
    mv "$src" "$dest/$spec_file"
  else
    echo "Code file $dest/$code_file_base{.js,.jsx,.ts,.tsx} not found. Skipping."
  fi
}

move_and_rename_story() {
  src="$1"
  dest="$2"
  test_file=$(basename "$src")
  code_file_base="${test_file%.*}"
  code_file_base="${code_file_base%.story}"
  spec_file="${test_file/.story/.stories}"
  code_file=""

  # Check for different file extensions
  for ext in .js .jsx .ts .tsx; do
    if [ -e "$dest/$code_file_base$ext" ]; then
      code_file="$dest/$code_file_base$ext"
      break
    fi
  done

  if [ -n "$code_file" ]; then
    echo "Moving $src to $dest/$spec_file"
    mv "$src" "$dest/$spec_file"
  else
    echo "Code file $dest/$code_file_base{.js,.jsx,.ts,.tsx} not found. Skipping."
  fi
}

echo "Starting restructuring process..."

# Iterate through client test files with .test.js extension
for test_file in $(find __tests/client -type f -name "*.test.js"); do
  dest=${test_file#__tests/client}
  dest="./${dest#/}"
  echo "Processing client test file: $test_file"
  move_and_rename "$test_file" "$(dirname "$dest")"
done

# Iterate through client test files with .test.ts extension
for test_file in $(find __tests/client -type f -name "*.test.ts"); do
  dest=${test_file#__tests/client}
  dest="./${dest#/}"
  echo "Processing client test file: $test_file"
  move_and_rename "$test_file" "$(dirname "$dest")"
done

# Iterate through client test files with .test.tsx extension
for test_file in $(find __tests/client -type f -name "*.test.tsx"); do
  dest=${test_file#__tests/client}
  dest="./${dest#/}"
  echo "Processing client test file: $test_file"
  move_and_rename "$test_file" "$(dirname "$dest")"
done


# Iterate through server test files
for test_file in $(find __tests/server -type f -name "*.test.js"); do
  dest=${test_file/__tests\/server/server}
  echo "Processing server test file: $test_file"
  move_and_rename "$test_file" "$(dirname "$dest")"
done

# Iterate through reporting test files
for test_file in $(find __tests/reporting -type f -name "*.test.js"); do
  dest=${test_file/__tests\/reporting/reporting}
  echo "Processing reporting test file: $test_file"
  move_and_rename "$test_file" "$(dirname "$dest")"
done

echo "Preparing storybook files"
mkdir -p .storybook/stories/components/inputs/
mv .storybook/stories/components/Checkbox.story.tsx .storybook/stories/components/inputs/Checkbox.story.tsx
mv .storybook/stories/components/CvvInputControl.story.tsx .storybook/stories/components/inputs/CvvInputControl.story.tsx
mv .storybook/stories/components/DatePicker.story.tsx .storybook/stories/components/inputs/DatePicker.story.tsx
mkdir -p .storybook/stories/styles
mv .storybook/stories/components/Colors.story.tsx .storybook/stories/styles/cp.story.tsx
mkdir -p .storybook/stories/components/icons
mv .storybook/stories/components/IconsWithColor.story.tsx .storybook/stories/components/icons/IconBase.story.tsx
mv .storybook/stories/components/InvoicePreview.story.tsx .storybook/stories/sections/InvoicePreview.story.tsx
mkdir -p .storybook/stories/components/inputs
mv .storybook/stories/components/LabeledCheckbox.story.tsx .storybook/stories/components/inputs/LabeledCheckbox.story.tsx
mv .storybook/stories/components/LabeledInput.story.tsx .storybook/stories/components/inputs/LabeledInput.story.tsx
mv .storybook/stories/components/LabeledSelect.story.tsx .storybook/stories/components/inputs/LabeledSelect.story.tsx
mv .storybook/stories/components/LabeledSwitch.story.tsx .storybook/stories/components/inputs/LabeledSwitch.story.tsx
mv .storybook/stories/components/PaymentAmountInput.story.tsx .storybook/stories/components/inputs/PaymentAmountInput.story.tsx
mv .storybook/stories/components/Radio.story.tsx .storybook/stories/components/inputs/Radio.story.tsx
mv .storybook/stories/components/Select.story.tsx .storybook/stories/components/inputs/Select.story.tsx
mv .storybook/stories/components/SpinnerCenterd.story.tsx .storybook/stories/components/SpinnerCentered.story.tsx
mv .storybook/stories/components/Switch.story.tsx .storybook/stories/components/inputs/Switch.story.tsx
mv .storybook/stories/components/ValidatedLabeledInput.story.tsx .storybook/stories/components/inputs/ValidatedLabeledInput.story.tsx

mv .storybook/stories/sections/oneToMany/OneToManyInfoCard.story.tsx .storybook/stories/sections/oneToMany/OneToManyMerchantInfoCard.story.tsx
mv .storybook/stories/sections/oneToMany/OneToManyInfoMoreDetails.story.tsx .storybook/stories/sections/oneToMany/OneToManyMoreDetails.story.tsx

mv .storybook/stories/sections/payorHistory/SalesSection/PayorHistorySaleSection.story.tsx .storybook/stories/sections/payorHistory/SalesSection/PayorHistorySalesSection.story.tsx
mv .storybook/stories/sections/payorHistory/SalesSection/PayorHistorySalesTab.story.tsx .storybook/stories/sections/payorHistory/SalesSection/PayorHistorySalesTabs.story.tsx

mv .storybook/stories/sections/payorHistory/Toasts/PaymentHistoryFileErrorToast.story.tsx .storybook/stories/sections/payorHistory/Toasts/PayorHistoryFileErrorToast.story.tsx
mkdir -p .storybook/stories/sections/payorHistory/TransactionPaperTrail
mv .storybook/stories/sections/payorHistory/TransactionPaperTrailSection/PayorHistoryTransactionPaperTrailSection.story.tsx .storybook/stories/sections/payorHistory/TransactionPaperTrail/PayorHistoryTransactionPaperTrailSection.story.tsx

mv .storybook/stories/sections/PDFLock.story.js .storybook/stories/sections/PDFLock.story.tsx
mkdir -p .storybook/stories/sections/qualtricsSurveys
mv .storybook/stories/sections/QualtricsFeedbackRequest.story.tsx .storybook/stories/sections/qualtricsSurveys/QualtricsFeedbackRequest.story.tsx

echo "Running storybook files"
# Iterate through storybook files
for test_file in $(find .storybook/stories -type f -name "*.story.tsx"); do
  dest=${test_file#.storybook/stories}
  dest="./${dest#/}"
  echo "Processing reporting test file: $test_file"
  move_and_rename_story "$test_file" "$(dirname "$dest")"
done

echo "Removing empty __tests directories..."
find __tests -type d -empty -delete

echo "Removing empty storybook directories..."
find .storybook/stories -type d -empty -delete

echo "Restructuring process completed."
```
{{< /spoiler >}}

There you have it! That's how ChatGPT helped me write a script that saved my precious time and sanity.

Now, before we wrap up this lovely story, I've got a little something for our dear Padawans out there.

{{< padawans-playground >}}

![Git diff in VS Code](02-god-bless-chat-gpt-2.png)

Here's a small yet handy lifehack that I used while working on this script. I wanted to see what changed between revisions of the script generated by ChatGPT. So I used **git** to track these modifications:

1. `git add` the script at first revision (without committing, just add).
2. Generate a new revision and copy-paste it to the same file.
3. Check what changed since the previous version.
4. `git add` again.
5. Repeat from step 2.

And there you have it! A neat way to keep track of your revisions using git.

{{< /padawans-playground >}}

That's all for today, folks! Remember, ChatGPT is your friend in need and indeed your friend in code (see what I did there? 😜). Keep experimenting and let AI assist you in becoming a more efficient developer!

Until next time, happy coding! ✌️