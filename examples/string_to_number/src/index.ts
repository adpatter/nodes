import * as stream from 'node:stream';
import { Config, Node } from '@far-analytics/nodes';

export class StringToNumber extends Node<string, number> {

    constructor(options: stream.TransformOptions) {
        super(new stream.Transform({
            ...options, ...{
                writableObjectMode: true,
                readableObjectMode: true,
                transform: (chunk: string, encoding: BufferEncoding, callback: stream.TransformCallback) => {
                    try {
                        const result = parseFloat(chunk.toString());
                        callback(null, result);
                    }
                    catch (err) {
                        if (err instanceof Error) {
                            callback(err);
                            Config.errorHandler(err);
                        }
                    }
                }
            }
        }));
    }
}