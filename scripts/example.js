import { chromium } from 'playwright';
import { humanPause } from '../utils/humanPause.js';
import { logEvent } from '../utils/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptName = path.basename(__filename, '.js');

async function exampleScript(ylopoLeadUrl, address) {
  const browser = await chromium.launch({ headless: true });
  // const sessionFile = path.resolve(__dirname, '../cookies/platform-session.json');
  // const context = await browser.newContext({ storageState: sessionFile });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  try {
    await page.goto(ylopoLeadUrl, { waitUntil: 'domcontentloaded' });
    
    // If you're redirected to login, session expired — handle below
    if (page.url().includes('/auth')) {
      const startTime = Date.now();
      logEvent({
        automation: scriptName,
        action: 'start',
        status: 'error-progress',
        startTime,
        metadata: { input: req.body.input, error: 'Session not valid / expired. Re-save storageState by logging in manually.' }
      });
      await browser.close();
      process.exit(1);
    }

    await context.close();
    await browser.close();

    return { };
  } catch (err) {
    await browser.close();
    throw err;
  }
}

export default async function run(input = {}) {

  // get inputs
  // const ylopoLeadUrl = input.ylopoLeadUrl
  // const address = input.address
  // const followupbossContactUrl = input.followupbossContactUrl
  // const FUBtag = input.FUBtag || "Seller Report Callaction"

  // run scripts
  // const result = await getYlopoSellerReport(ylopoLeadUrl, address);
  // const followupboss = await sendTextInFollowUpBoss(followupbossContactUrl, result.reportUrl, FUBtag);

  // return results
  // return { ok: true, result: result.reportUrl };
}
