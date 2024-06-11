import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { join } from "path";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost)
    {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.message;

        const body = {
            statusCode: status,
            timeStamp: new Date().toISOString(),
            message: message,
            path: request.url,
            tesT: 'Test'
        }

        this.writeHttpLog(body);
        response.status(status).json(body);
    }

    private async writeHttpLog(data: Record<string, any>)
    {
        const LOGS_DIR = join(__dirname, `${Date.now()}-log.json`);
        try {
            await writeFile(LOGS_DIR, JSON.stringify(data));
        }
        catch(err)
        { return; }
    }
}