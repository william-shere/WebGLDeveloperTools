/**
 * @see http://www.khronos.org/webgl/wiki/Debugging
 * @see http://www.khronos.org/webgl/wiki/HandlingContextLost
 */

interface WebGLDebugLostContextSimulatingCanvas extends HTMLCanvasElement {
  getNumCalls(): number;
  loseContext(): void;
  loseContextInNCalls(numCalls: number): void;
  restoreContext(): void;
  setRestoreTimeout(timeout: number): void;
}

type WebGLDebugOnErrorFunction = (err: GLenum, functionName: string, args: any[]) => void;
type WebGLDebugOnFunction = (functionName: string, args: any[]) => void;

declare namespace WebGLDebugUtils {
  /**
   * Gets an string version of an WebGL enum.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
   *
   * @param {number} value Value to return an enum for
   * @return {string} The string version of the enum.
   */
  function glEnumToString(value: GLenum): string;

  /**
   * Converts the argument of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * Example:
   *   WebGLDebugUtil.init(ctx);
   *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 2, 0, gl.TEXTURE_2D);
   *
   * would return 'TEXTURE_2D'
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} numArgs The number of arguments
   * @param {number} argumentIndx the index of the argument.
   * @param {*} value The value of the argument.
   * @return {string} The value as a string.
   */
  function glFunctionArgToString(functionName: string, numArgs: number, argumentIndx: number, value: any): string;

  /**
   * Converts the arguments of a WebGL function to a string.
   * Attempts to convert enum arguments to strings.
   *
   * @param {string} functionName the name of the WebGL function.
   * @param {number} args The arguments.
   * @return {string} The arguments as a string.
   */
  function glFunctionArgsToString(functionName: string, args: any[]): string;

  /**
   * Initializes this module. Safe to call more than once.
   * @param {!WebGLRenderingContext} ctx A WebGL context. If
   *    you have more than one context it doesn't matter which one
   *    you pass in, it is only used to pull out constants.
   */
  function init(ctx: WebGLRenderingContext): void;

  /**
   * Returns true or false if value matches any WebGL enum
   * @param {*} value Value to check if it might be an enum.
   * @return {boolean} True if value matches one of the WebGL defined enums
   */
  function mightBeEnum(value: any): boolean;

  /**
   * Given a canvas element returns a wrapped canvas element that will
   * simulate lost context. The canvas returned adds the following functions.
   *
   * loseContext:
   *   simulates a lost context event.
   *
   * restoreContext:
   *   simulates the context being restored.
   *
   * lostContextInNCalls:
   *   loses the context after N gl calls.
   *
   * getNumCalls:
   *   tells you how many gl calls there have been so far.
   *
   * setRestoreTimeout:
   *   sets the number of milliseconds until the context is restored
   *   after it has been lost. Defaults to 0. Pass -1 to prevent
   *   automatic restoring.
   *
   * @param {!Canvas} canvas The canvas element to wrap.
   */
  function makeLostContextSimulatingCanvas(canvas: HTMLCanvasElement): WebGLDebugLostContextSimulatingCanvas;

  /**
   * Given a WebGL context returns a wrapped context that calls
   * gl.getError after every command and calls a function if the
   * result is not NO_ERROR.
   *
   * You can supply your own function if you want. For example, if you'd like
   * an exception thrown on any GL error you could do this
   *
   *    function throwOnGLError(err, funcName, args) {
   *      throw WebGLDebugUtils.glEnumToString(err) +
   *            " was caused by call to " + funcName;
   *    };
   *
   *    ctx = WebGLDebugUtils.makeDebugContext(
   *        canvas.getContext("webgl"), throwOnGLError);
   *
   * @param {!WebGLRenderingContext} context The webgl context to wrap.
   * @param {!function(err, funcName, args): void} onErrorFunc The function
   *     to call when gl.getError returns an error. If not specified the default
   *     function calls console.log with a message.
   * @param {!function(funcName, args): void} onFunc The
   *     function to call when each webgl function is called. You
   *     can use this to log all calls for example.
   */
  function makeDebugContext(context: WebGLRenderingContext, onErrorFunc?: WebGLDebugOnErrorFunction, onFunc?: WebGLDebugOnFunction): WebGLRenderingContext;
  function makeDebugContext(context: WebGL2RenderingContext, onErrorFunc?: WebGLDebugOnErrorFunction, onFunc?: WebGLDebugOnFunction): WebGL2RenderingContext;

  /**
   * Resets a context to the initial state.
   * @param {!WebGLRenderingContext} context The webgl context to reset.
   */
  function resetToInitialState(context: WebGLRenderingContext): void;
}
